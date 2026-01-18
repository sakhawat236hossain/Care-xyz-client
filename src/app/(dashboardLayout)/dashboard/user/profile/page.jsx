"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import { User, Mail, ShieldCheck, MapPin, Camera } from 'lucide-react';

const ProfilePage = () => {
    const { data: session } = useSession();

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-black tracking-tighter uppercase italic text-zinc-900 dark:text-white">
                    My <span className="text-blue-600">Profile</span>
                </h1>
                <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest mt-1">Manage your personal information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Side: Avatar Card */}
                <div className="md:col-span-1">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 text-center shadow-xl shadow-zinc-200/50 dark:shadow-none">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-black border-4 border-white dark:border-zinc-800 shadow-2xl">
                                {session?.user?.name?.charAt(0)}
                            </div>
                            <button className="absolute bottom-1 right-1 bg-zinc-900 text-white p-2 rounded-full border-2 border-white hover:scale-110 transition-transform cursor-pointer">
                                <Camera size={16} />
                            </button>
                        </div>
                        <h2 className="text-xl font-black text-zinc-900 dark:text-white truncate">
                            {session?.user?.name}
                        </h2>
                        <span className="inline-block px-4 py-1 mt-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-800">
                            {session?.user?.role || "User"}
                        </span>
                    </div>
                </div>

                {/* Right Side: Details Form */}
                <div className="md:col-span-2">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                        <div className="space-y-6">
                            {/* Name Field */}
                            <div className="group">
                                <label className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
                                    <User size={12} className="text-blue-600" /> Full Name
                                </label>
                                <div className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 px-6 py-4 rounded-2xl font-bold text-zinc-700 dark:text-zinc-200">
                                    {session?.user?.name}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="group">
                                <label className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
                                    <Mail size={12} className="text-blue-600" /> Email Address
                                </label>
                                <div className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 px-6 py-4 rounded-2xl font-bold text-zinc-700 dark:text-zinc-200">
                                    {session?.user?.email}
                                </div>
                            </div>

                            {/* Role Field */}
                            <div className="group">
                                <label className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
                                    <ShieldCheck size={12} className="text-blue-600" /> Account Role
                                </label>
                                <div className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 px-6 py-4 rounded-2xl font-bold text-zinc-700 dark:text-zinc-200 capitalize">
                                    {session?.user?.role}
                                </div>
                            </div>

                            {/* Location (Dummy for now) */}
                            <div className="group">
                                <label className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
                                    <MapPin size={12} className="text-blue-600" /> Location
                                </label>
                                <div className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 px-6 py-4 rounded-2xl font-bold text-zinc-400 italic">
                                    Not provided yet
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-10 bg-zinc-900 dark:bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-tighter hover:scale-[1.02] transition-transform shadow-xl shadow-zinc-900/20 dark:shadow-blue-500/20 cursor-pointer">
                            Update Profile Info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;