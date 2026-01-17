import { collections, dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const userCollection = await dbConnect(collections.USERS);
        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role || "user",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const { name, email, image } = user;
          const userCollection = await dbConnect(collections.USERS);
          const isExist = await userCollection.findOne({ email });

          if (!isExist) {
            await userCollection.insertOne({
              name,
              email,
              image,
              role: "user",
              provider: "google",
              createdAt: new Date(),
            });
          }
          return true;
        } catch (error) {
          console.error("Error saving google user:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      } else if (!token.role) {
        const userCollection = await dbConnect(collections.USERS);
        const dbUser = await userCollection.findOne({ email: token.email });
        if (dbUser) {
          token.role = dbUser.role || "user";
          token.id = dbUser._id.toString();
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };