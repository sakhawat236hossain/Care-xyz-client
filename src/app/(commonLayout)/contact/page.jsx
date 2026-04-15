"use client";

import React, { useState } from 'react';
import { useSession } from "next-auth/react"; 
import { 
  Mail, Phone, Send, Globe, Facebook, Twitter, Github,
  CheckCircle2, Loader2, User, MessageSquare, Hash
} from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const { data: session } = useSession(); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: session?.user?.name || e.target.name.value,
      email: session?.user?.email || e.target.email.value,
      image: session?.user?.image || "", 
      phone: e.target.phone.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("/api/admin/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        e.target.reset(); 
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      toast.error("Sorry, failed to send the message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500 pb-12">
      
      {/* Header Section */}
      <section className="pt-16 pb-8 px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-wider mb-4">
            Direct Connection
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
            Let's <span className="text-blue-600">Connect</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto mt-2 font-medium">
            Discuss your needs or project directly.
          </p>
      </section>

      <section className="px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Info & Profile */}
          <div className="lg:col-span-4 space-y-6">
            {/* User Profile Summary (If logged in) */}
            {session?.user && (
              <div className="p-4 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                <img src={session.user.image} alt="profile" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500/20" />
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{session.user.name}</h4>
                  <p className="text-xs text-zinc-500 truncate w-40">{session.user.email}</p>
                </div>
              </div>
            )}

            <div className="p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-6">
              <h3 className="text-lg font-black dark:text-white flex items-center gap-2"><Hash size={18} className="text-blue-600"/> Contact Info</h3>
              <div className="space-y-4">
                {[
                  { icon: <Phone size={16} />, label: "Phone", val: "01851121472", href: "tel:01851121472", color: "text-blue-600", bg: "bg-blue-50" },
                  { icon: <Mail size={16} />, label: "Email", val: "hmdsakhawat236@gmail.com", href: "mailto:hmdsakhawat236@gmail.com", color: "text-emerald-600", bg: "bg-emerald-50" },
                  { icon: <Globe size={16} />, label: "Portfolio", val: "Visit Website", href: "#", color: "text-purple-600", bg: "bg-purple-50" }
                ].map((item, i) => (
                  <a key={i} href={item.href} className="flex items-center gap-3 group">
                    <div className={`w-10 h-10 flex-shrink-0 rounded-2xl ${item.bg} dark:bg-zinc-800 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase">{item.label}</p>
                      <p className="text-sm font-bold dark:text-zinc-200 truncate">{item.val}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Enhanced Form */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-blue-500/5">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-8">Send a Detailed Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name (Readonly if session exists) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 ml-1 flex items-center gap-1"><User size={14}/> Full Name</label>
                  <input name="name" type="text" defaultValue={session?.user?.name || ""} placeholder="John Doe" className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all dark:text-white font-medium" required={!session?.user} />
                </div>

                {/* Email (Readonly if session exists) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 ml-1 flex items-center gap-1"><Mail size={14}/> Email Address</label>
                  <input name="email" type="email" defaultValue={session?.user?.email || ""} placeholder="example@mail.com" className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all dark:text-white font-medium" required={!session?.user} />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 ml-1 flex items-center gap-1"><Phone size={14}/> Phone Number</label>
                  <input name="phone" type="tel" placeholder="+880 1XXX XXXXXX" className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all dark:text-white font-medium" required />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 ml-1 flex items-center gap-1"><MessageSquare size={14}/> Subject</label>
                  <input name="subject" type="text" placeholder="e.g. Caregiving Inquiry" className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all dark:text-white font-medium" required />
                </div>
              </div>

              {/* Detailed Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 ml-1 flex items-center gap-1">Detailed Description</label>
                <textarea name="message" rows="5" placeholder="how can I help you..." className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all dark:text-white font-medium resize-none" required></textarea>
              </div>
              
              <button 
                disabled={loading}
                className="w-full cursor-pointer md:w-max px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-3 group disabled:opacity-70"
              >
                {loading ? (
                  <>Sending Request... <Loader2 size={20} className="animate-spin" /></>
                ) : (
                  <>Submit Inquiry <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;