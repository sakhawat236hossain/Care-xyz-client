"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, 
    });

    if (res.ok) {
      toast.success("Login Successful!");
      router.push("/"); 
      router.refresh(); 
    } else {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <Toaster position="top-center" />
      
      <form onSubmit={handleLogin} className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800">
        <h2 className="text-2xl font-black mb-6 text-zinc-900 dark:text-white text-center">Welcome Back</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-500 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="example@mail.com" 
              required 
              className="w-full px-5 py-3 mt-1 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition" 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 ml-1">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              required 
              className="w-full px-5 py-3 mt-1 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition" 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25"
          >
            Log In
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          New here? <Link href="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

// এই লাইনটি চেক করুন, এটি ছাড়া Next.js এরর দিবে
export default LoginPage;