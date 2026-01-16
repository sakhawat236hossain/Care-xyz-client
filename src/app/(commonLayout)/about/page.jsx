"use client";

import React from 'react';
import { Target, Heart, ShieldCheck, Users, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      
      {/* 1. Hero Section - Modern & Clean */}
      <section className="relative py-24 px-6 overflow-hidden border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white leading-[1.1]">
              We are here to care for your <span className="text-blue-600 italic">loved ones.</span>
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Since 2020, we have been committed to providing high-quality care through technology and professional caregivers to bring peace to every family.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-full text-blue-600 text-sm font-bold">
                  <Award size={16} /> 5+ Years Excellence
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/10 rounded-[3rem] blur-2xl"></div>
            <div className="relative rounded-[3rem] overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/3768114/pexels-photo-3768114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Professional Nurse"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Values Grid */}
      <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black text-zinc-900 dark:text-white">Why Choose Us?</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Target className="text-blue-600" />, 
                title: "Our Mission", 
                desc: "To provide accessible, high-quality home care services that enhance the quality of life." 
              },
              { 
                icon: <Heart className="text-rose-500" />, 
                title: "Our Values", 
                desc: "Compassion, integrity, and respect are at the heart of everything we do for your family." 
              },
              { 
                icon: <Users className="text-emerald-500" />, 
                title: "Expert Nurses", 
                desc: "Every member of our team is highly trained with 5+ years of clinical experience." 
              }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-zinc-100 dark:border-zinc-800 group">
                <div className="mb-6 p-4 w-fit bg-zinc-50 dark:bg-zinc-800 rounded-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">{item.title}</h4>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Detailed Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
             <img 
               src="https://images.pexels.com/photos/7551608/pexels-photo-7551608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
               className="rounded-[3rem] shadow-2xl" 
               alt="Personalized Care" 
             />
          </div>
          <div className="order-1 lg:order-2 space-y-8">
             <h2 className="text-4xl font-black text-zinc-900 dark:text-white">Providing Personalized Care Plans for Everyone.</h2>
             <p className="text-zinc-500 dark:text-zinc-400 text-lg">We understand that every patient has unique needs. Our team creates specialized plans to ensure comfort and recovery.</p>
             
             <div className="space-y-4">
                {["Background Checked Staff", "24/7 Premium Support", "Insurance Covered Services"].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 font-bold text-zinc-800 dark:text-zinc-200">
                    <CheckCircle2 className="text-blue-600" size={24} />
                    {text}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 4. Join Our Team CTA */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-blue-600 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          {/* Decorative Orbs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-20 -mt-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mb-20"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black">Join Our Team</h2>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto font-medium">
              Are you a skilled and compassionate individual? Do you love helping people? Apply to join our professional team today.
            </p>
            <button className="bg-white text-blue-600 px-12 py-5 rounded-[2rem] font-black text-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3 group">
              Apply for Career
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default AboutPage;