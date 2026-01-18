"use client";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">
        {isAdmin ? "Admin Control Panel" : "User Dashboard"}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isAdmin ? (
          <>
            <div className="p-8 bg-zinc-900 text-white rounded-[2rem] shadow-xl">
              <p className="text-xs font-bold opacity-60 uppercase">System Bookings</p>
              <h2 className="text-4xl font-black mt-2">1,240</h2>
            </div>
          
          </>
        ) : (
          <>
            <div className="p-8 bg-blue-600 text-white rounded-[2rem] shadow-xl shadow-blue-500/20">
              <p className="text-xs font-bold opacity-60 uppercase">My Total Bookings</p>
              <h2 className="text-4xl font-black mt-2">05</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
}