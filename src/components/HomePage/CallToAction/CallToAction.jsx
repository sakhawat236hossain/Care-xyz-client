"use client";

import { PhoneCall, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Container with Background Image & Overlay */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/10 shadow-2xl group">
          
          {/* Background Image with Parallax-like effect */}
          <div className="absolute inset-0 z-0 opacity-40 group-hover:scale-105 transition-transform duration-700 ease-out">
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2000&auto=format&fit=crop" 
              alt="Caregiver holding hand"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Gradient Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-transparent z-1"></div>

          {/* Subtle Animated Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 py-16 md:px-16">
            
            {/* Left side: Content */}
            <div className="lg:w-3/5 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Sparkles size={14} className="animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Available 24/7 Worldwide</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Quality Care You Can <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Trust & Rely On.
                </span>
              </h2>
              
              <p className="text-zinc-300 text-base md:text-lg font-medium max-w-lg leading-relaxed">
                Connect with our compassionate team today. We provide professional medical assistance tailored to your family's needs.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                 <div className="flex items-center gap-2 text-zinc-400">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    <span className="text-sm font-semibold text-white">Certified Experts</span>
                 </div>
                 <div className="h-1 w-1 bg-zinc-700 rounded-full hidden md:block"></div>
                 <div className="flex items-center gap-2 text-zinc-400">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    <span className="text-sm font-semibold text-white">Full Insurance Cover</span>
                 </div>
              </div>
            </div>

            {/* Right side: Modern Button */}
            <div className="mt-12 lg:mt-0 ">
              <button className="group relative flex items-center gap-5 bg-blue-600 hover:bg-blue-500 text-white p-2 pr-8 rounded-3xl font-bold transition-all duration-300 shadow-[0_0_40px_rgba(37,99,235,0.3)] active:scale-95">
                {/* Icon Container */}
                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                  <PhoneCall size={24} className="group-hover:text-blue-600 transition-colors" />
                </div>
                
                {/* Button Text */}
                <div className="text-left leading-tight cursor-pointer">
                  <span className="block text-[11px] uppercase tracking-tighter opacity-70 group-hover:opacity-100">Talk to us now</span>
                  <span className="text-xl">01851121472</span>
                </div>

                <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;