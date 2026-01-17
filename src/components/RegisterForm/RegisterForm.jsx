"use client";
import { uploadImageToCloudinary } from '@/hooks/Utils';
import React, { useState } from 'react';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.image.files[0]; 

    try {
      let imageUrl = "https://i.ibb.co/31S990S/user.png"; 

      if (imageFile) {
        const uploadRes = await uploadImageToCloudinary(imageFile);
        if (uploadRes) {
          imageUrl = uploadRes;
        }
      }

      const userInfo = { 
        name, 
        email, 
        password, 
        image: imageUrl 
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      if (res.ok) {
        alert("Registration Successful! Please Login.");
        form.reset();
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during registration!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <form onSubmit={handleRegister} className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800">
        <h2 className="text-2xl font-black mb-6 text-zinc-900 dark:text-white text-center">Create Account</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-500 ml-1">Full Name</label>
            <input type="text" name="name" placeholder="John Doe" required className="w-full px-5 py-3 mt-1 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition" />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 ml-1">Email Address</label>
            <input type="email" name="email" placeholder="example@mail.com" required className="w-full px-5 py-3 mt-1 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition" />
          </div>

          {/* ৪. ফাইল ইনপুট ফিল্ড - যা ফাইল এক্সপ্লোরার ওপেন করবে */}
          <div>
            <label className="text-xs font-bold text-zinc-500 ml-1">Profile Image</label>
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              className="w-full px-5 py-2.5 mt-1 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition" 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 ml-1">Password</label>
            <input type="password" name="password" placeholder="••••••••" required className="w-full px-5 py-3 mt-1 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition" />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Uploading & Registering..." : "Register Now"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account? <a href="/login" className="text-blue-600 font-bold hover:underline">Log In</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;