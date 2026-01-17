import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
const user = { id: 1, name: "J Smith", email: "test@gmail.com"}

export const authOptions = {


  // Configure one or more authentication providers
  providers: [
   CredentialsProvider({
    //  (e.g. 'Sign in with...')
    name: 'Credentials',
    credentials: {
     email: { label: "Email", type: "text", placeholder: "your Email" },
    //  label: "Username", type: "text", placeholder: "jsmith" 
      password: { label: "Password", type: "password", placeholder: "your password" }
    },
    async authorize(credentials, req) {
      
    //   const res = await fetch("/your/endpoint", {
    //     method: 'POST',
    //     body: JSON.stringify(credentials),
    //     headers: { "Content-Type": "application/json" }
    //   })
    //   const user = await res.json()

      // If no error and we have user data, return it
    //   if (res.ok && user) {
    //     return user
    //   }
      // Return null if user data could not be retrieved
      
       console.log(credentials);
       if(user){
        return user
       }
      return null
    }
  })
  ],
}

const handler= NextAuth(authOptions);
export { handler as GET, handler as POST };
