// src/app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Care.xyz - Trusted Caregiving",
  description: "Reliable and trusted care services for children and elderly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}