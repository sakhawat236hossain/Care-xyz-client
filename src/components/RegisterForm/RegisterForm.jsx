"use client";
import { uploadImageToCloudinary } from "@/hooks/Utils";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value;
    const imageFile = form.image.files[0];

    if (!name || !email || !phone || !password) {
      toast.error("Please fill in all the fields!");
      return;
    }

    if (!imageFile) {
      toast.error("Please select a profile image!");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be 6+ chars with uppercase, lowercase & a number!",
      );
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating your account...");

    try {
      let imageUrl = "";
      const uploadRes = await uploadImageToCloudinary(imageFile);

      if (uploadRes) {
        imageUrl = uploadRes;
      } else {
        toast.error("Image upload failed!", { id: toastId });
        setLoading(false);
        return;
      }

      const userInfo = { name, email, phone, password, image: imageUrl };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      if (res.ok) {
        toast.success("Account created! Logging you in...", { id: toastId });

        const loginResult = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        });

        if (loginResult?.ok) {
          toast.success("Successfully Logged In!");
          form.reset();
          router.push("/");
          router.refresh();
        } else {
          toast.error(
            "Registration done, but login failed. Please login manually.",
          );
          router.push("/login");
        }
      } else {
        const error = await res.json();
        toast.error(error.message || "Registration failed!", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <Toaster position="top-center" reverseOrder={false} />

      <form
        onSubmit={handleRegister}
        className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800"
      >
        <h2 className="text-2xl font-black mb-6 text-zinc-900 dark:text-white text-center">
          Create Account
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-500 ml-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full px-5 py-3 mt-1 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 ml-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              className="w-full px-5 py-3 mt-1 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+880 1XXX XXXXXX"
              className="w-full px-5 py-3 mt-1 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 ml-1">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full px-5 py-2.5 mt-1 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
            />
          </div>

          <div className="relative">
            <label className="text-xs font-bold text-zinc-500 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full px-5 py-3 mt-1 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-blue-500 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </div>
        <div className="mt-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-400">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            type="button"
            className="cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all font-semibold"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-5 h-5"
              alt="Google"
            />
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-bold hover:underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
