"use client";

import React from 'react';
import { 
  Mail, 
  Phone, 
  Send, 
  Globe, 
  Facebook, 
  Twitter, 
  Github,
  CheckCircle2
} from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent to Sakhawat!");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500 pb-12">
      
      {/* --- 1. Compact Header --- */}
      <section className="pt-16 pb-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-wider">
            Direct Connection
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
            Let's <span className="text-blue-600">Connect</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">
            Whether you need caregiving or want to discuss a project, I'm just a message away.
          </p>
        </div>
      </section>

      {/* --- 2. Main Content Grid --- */}
      <section className="px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Side: Info (4 Columns on Large Screen) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-6">
              <h3 className="text-lg font-black dark:text-white">Contact Info</h3>
              
              <div className="space-y-4">
                {[
                  { icon: <Phone size={16} />, label: "Phone", val: "01851121472", href: "tel:01851121472", color: "text-blue-600", bg: "bg-blue-50" },
                  { icon: <Mail size={16} />, label: "Email", val: "hmdsakhawat236@gmail.com", href: "mailto:hmdsakhawat236@gmail.com", color: "text-emerald-600", bg: "bg-emerald-50" },
                  { icon: <Globe size={16} />, label: "Portfolio", val: "Visit Website", href: "https://my-portfolio-web-two-theta.vercel.app/", color: "text-purple-600", bg: "bg-purple-50" }
                ].map((item, i) => (
                  <a key={i} href={item.href} target="_blank" className="flex items-center gap-3 group">
                    <div className={`w-9 h-9 flex-shrink-0 rounded-xl ${item.bg} dark:bg-zinc-800 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{item.label}</p>
                      <p className="text-sm font-bold dark:text-zinc-200 truncate">{item.val}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Socials */}
              <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
                {[
                  { icon: <Facebook size={18} />, href: "https://www.facebook.com/md.sakhawth.hosain" },
                  { icon: <Twitter size={18} />, href: "https://x.com/MdSakhawat21005" },
                  { icon: <Github size={18} />, href: "https://github.com/sakhawat236hossain" }
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Box (Mobile Friendly) */}
            <div className="p-5 bg-blue-600 rounded-[1.5rem] text-white relative overflow-hidden group">
              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-bold text-blue-100">
                  <CheckCircle2 size={14} /> Available Now
                </div>
                <h4 className="text-base font-black">Need a Caregiver or Developer?</h4>
                <p className="text-blue-100/80 text-[12px] leading-tight">Accepting new projects and placements today.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Form (8 Columns on Large Screen) */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 ml-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-800 border-none focus:ring-1 focus:ring-blue-600 outline-none transition-all dark:text-white" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 ml-1">Email</label>
                  <input type="email" placeholder="example@mail.com" className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-800 border-none focus:ring-1 focus:ring-blue-600 outline-none transition-all dark:text-white" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 ml-1">Message</label>
                <textarea rows="4" placeholder="How can I help you?" className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-800 border-none focus:ring-1 focus:ring-blue-600 outline-none transition-all dark:text-white resize-none" required></textarea>
              </div>
              <button className="w-full sm:w-auto px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 group">
                Send Message
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;