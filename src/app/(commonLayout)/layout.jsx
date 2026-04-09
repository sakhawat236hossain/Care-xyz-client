import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

export default function CommonLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20"> 
        {children}
      </main>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}