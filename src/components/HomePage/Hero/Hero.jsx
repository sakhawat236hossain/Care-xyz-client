import Link from 'next/link';
import Image from 'next/image';
import { Star, ShieldCheck, Users, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-500">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-50 dark:bg-purple-900/10 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Content */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">
                Trusted by 5000+ Families
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.2]">
              Professional Care <br />
              <span className="text-blue-600 dark:text-blue-400 font-black">At Your Home</span>
            </h1>

            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
              Experience reliable caregiving services for your loved ones. Safety, trust, and professional support you can count on.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                href="/services" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 active:scale-95 text-center flex items-center justify-center gap-2"
              >
                Book Now <ArrowRight size={16} />
              </Link>
              <Link 
                href="/how-it-works" 
                className="px-6 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-center"
              >
                How It Works
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-100 dark:border-gray-900 w-fit">
              <div className="flex -space-x-2.5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-950 bg-gray-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <div className="space-y-0.5">
                <div className="flex text-yellow-400">
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                </div>
                <p className="text-[11px] font-bold text-gray-600 dark:text-gray-400">4.9/5 Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right: Visual Experience */}
          <div className="relative lg:block animate-in fade-in zoom-in duration-1000">
            {/* Image Container - Size Optimized */}
            <div className="relative z-10 w-full max-w-[450px] mx-auto aspect-square rounded-[2rem] overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800" 
                className="w-full h-full object-cover"
                alt="Caregiving Service"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent" />
            </div>

            {/* Floating Card 1: Verified - Smaller Size */}
            <div className="absolute top-4 -right-2 md:-right-6 z-20 bg-white dark:bg-gray-900 p-3 rounded-xl shadow-xl border border-gray-50 dark:border-gray-800 animate-bounce duration-[3000ms]">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Verified Staff</p>
                  <p className="text-xs font-bold dark:text-white">100% Secure</p>
                </div>
              </div>
            </div>

            {/* Floating Card 2: Active Users - Smaller Size */}
            <div className="absolute -bottom-4 -left-2 md:-left-6 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-3.5 rounded-xl shadow-xl border border-white/50 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-lg font-black dark:text-white leading-none">200+</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Specialists</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;