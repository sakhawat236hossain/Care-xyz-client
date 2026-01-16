import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"; 
import Navbar from "@/components/Navbar/Navbar";

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}