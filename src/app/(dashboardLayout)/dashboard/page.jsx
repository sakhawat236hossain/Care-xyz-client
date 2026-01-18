"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { 
  Loader2, 
  Zap, 
  Clock, 
  PackageCheck, 
  ArrowUpRight, 
  ShieldCheck, 
  TrendingUp 
} from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ totalBookings: 0, pendingBookings: 0 });
  const [loading, setLoading] = useState(true);

  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    const fetchStats = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/dashboard-stats?email=${session.user.email}&role=${session.user.role}`);
          const data = await res.json();
          setStats(data);
        } catch (error) {
          console.error("Stats fetch failed", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchStats();
  }, [session]);

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="relative">
         <Loader2 className="animate-spin text-blue-600" size={48} />
         <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
            {isAdmin ? "Admin " : "User "} 
            <span className="text-blue-600">Control</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-2">
            Real-time Monitoring & Overview
          </p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-2xl border border-zinc-200 dark:border-zinc-700 w-fit">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">System Live</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Card 1: Total Bookings */}
        <div className="group relative p-8 bg-zinc-900 border border-zinc-800 rounded-[3rem] shadow-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500">
          <div className="absolute top-0 right-0 p-8 text-blue-500/20 group-hover:text-blue-500/40 transition-colors">
            <TrendingUp size={80} strokeWidth={3} />
          </div>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Total Requests</p>
          <div className="relative z-10 flex items-end gap-3">
            <h2 className="text-7xl font-black text-white tracking-tighter">
                {stats.totalBookings.toString().padStart(2, '0')}
            </h2>
            <div className="mb-3 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <ArrowUpRight size={20} className="text-blue-500" />
            </div>
          </div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase mt-4 tracking-widest">Successful Transactions</p>
        </div>

        {/* Card 2: Pending Requests */}
        <div className="group relative p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] shadow-xl hover:-translate-y-2 transition-all duration-500">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-all"></div>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Awaiting Approval</p>
          <div className="flex items-center justify-between">
            <h2 className="text-7xl font-black text-zinc-900 dark:text-white tracking-tighter">
                {stats.pendingBookings.toString().padStart(2, '0')}
            </h2>
            <div className="p-5 bg-orange-50 dark:bg-orange-950/30 text-orange-600 rounded-[2rem] group-hover:rotate-12 transition-transform">
                <Clock size={32} strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-orange-600/60 uppercase mt-4 tracking-widest italic">Requires attention</p>
        </div>

        {/* Card 3: Profile/Status Card */}
        <div className="group relative p-8 bg-blue-600 rounded-[3rem] shadow-2xl shadow-blue-500/30 overflow-hidden hover:-translate-y-2 transition-all duration-500">
           {/* Decorative circles */}
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
           
           <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                 <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white">
                    <ShieldCheck size={24} />
                 </div>
                 <span className="text-[10px] font-black bg-white text-blue-600 px-3 py-1 rounded-full uppercase tracking-tighter">
                    {session?.user?.role}
                 </span>
              </div>

              <div className="mt-8">
                 <p className="text-xs font-bold text-blue-100 uppercase opacity-80 mb-1 tracking-widest underline decoration-white/30 underline-offset-4">Verified Account</p>
                 <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight italic">
                    {session?.user?.name.split(' ')[0]} <br/> 
                    <span className="text-blue-200 font-medium lowercase italic text-lg opacity-80">{session?.user?.email.split('@')[0]}</span>
                 </h3>
              </div>
           </div>
        </div>

      </div>

      {/* Quick Tips or Info */}
      <div className="mt-12 p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] flex items-center gap-4">
         <div className="bg-white dark:bg-zinc-800 p-2 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <Zap size={18} className="text-yellow-500" fill="currentColor" />
         </div>
         <p className="text-xs font-bold text-zinc-500 uppercase tracking-tight">
            <span className="text-zinc-900 dark:text-zinc-200">Pro Tip:</span> You can manage all your care requests from the <span className="text-blue-600">My Bookings</span> tab in the sidebar.
         </p>
      </div>
    </div>
  );
}