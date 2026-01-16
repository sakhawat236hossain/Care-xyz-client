"use client";

import React from 'react';
import { 
  Stethoscope, 
  HeartPulse, 
  Clock, 
  UserCheck, 
  ShieldPlus, 
  Baby, 
  Activity, 
  ArrowRight,
  PlusCircle
} from 'lucide-react';

const servicesData = [
  {
    title: "Elderly Care",
    desc: "Compassionate support for seniors including daily activities, medication management, and companionship.",
    icon: <HeartPulse className="text-rose-500" />,
    color: "bg-rose-500/10",
    features: ["24/7 Monitoring", "Personal Hygiene", "Emotional Support"]
  },
  {
    title: "Post-Surgery Recovery",
    desc: "Specialized nursing care to help you recover faster after a hospital stay or surgery in the comfort of home.",
    icon: <Stethoscope className="text-blue-500" />,
    color: "bg-blue-500/10",
    features: ["Wound Dressing", "Pain Management", "Doctor Coordination"]
  },
  {
    title: "Chronic Illness Care",
    desc: "Long-term management for conditions like diabetes, heart disease, or respiratory issues by experts.",
    icon: <Activity className="text-emerald-500" />,
    color: "bg-emerald-500/10",
    features: ["Vital Monitoring", "Diet Planning", "Routine Checkups"]
  },
  {
    title: "Child Care",
    desc: "Expert pediatric caregivers to look after your little ones with safety, health, and development in mind.",
    icon: <Baby className="text-amber-500" />,
    color: "bg-amber-500/10",
    features: ["Feeding & Nutrition", "Playful Engagement", "Safe Environment"]
  },
  {
    title: "Physical Therapy",
    desc: "In-home physiotherapy sessions to regain strength, mobility, and independence after an injury.",
    icon: <PlusCircle className="text-indigo-500" />,
    color: "bg-indigo-500/10",
    features: ["Exercise Plans", "Mobility Training", "Injury Rehab"]
  },
  {
    title: "Emergency Support",
    desc: "On-call medical assistants ready to help you in urgent situations when every second counts.",
    icon: <ShieldPlus className="text-red-600" />,
    color: "bg-red-600/10",
    features: ["Rapid Response", "First Aid", "Hospital Transfer"]
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500">
      
      {/* --- Header Section --- */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
            Expert Medical Solutions
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter leading-tight">
            Our Professional <br /> <span className="text-blue-600">Care Services</span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            We offer a wide range of home-based healthcare services tailored to meet the unique needs of your family.
          </p>
        </div>
      </section>

      {/* --- Services Grid --- */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden"
            >
              {/* Icon & Background Circle */}
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {React.cloneElement(service.icon, { size: 32 })}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                  {service.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                  {service.desc}
                </p>

                {/* Service Features */}
                <div className="pt-4 space-y-2">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="pt-6 flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-wider group/btn">
                  Learn More 
                  <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>

              {/* Decorative Corner Glow */}
              <div className={`absolute -right-8 -bottom-8 w-24 h-24 ${service.color} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Quick Contact Banner --- */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto bg-zinc-900 dark:bg-blue-600 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="space-y-4 relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Need a Customized <br /> Care Plan?
            </h2>
            <p className="text-zinc-400 dark:text-blue-100 font-medium">
              Consult with our experts to find the perfect solution for your needs.
            </p>
          </div>

          <button className="bg-white text-zinc-900 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center gap-3 relative z-10">
            Get Free Consultation
            <Clock size={20} className="text-blue-600" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default Services;