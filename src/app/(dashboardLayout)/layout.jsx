"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Settings, 
  CalendarCheck, 
  Users, 
  Briefcase, 
  LogOut, 
  UserCircle 
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;

  const links = role === "admin" 
    ? [
        { name: "Overview", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "All Bookings", path: "/dashboard/admin/all-bookings", icon: <CalendarCheck size={20} /> },
        { name: "Manage Services", path: "/dashboard/admin/manage-services", icon: <Briefcase size={20} /> },
        { name: "Manage Users", path: "/dashboard/admin/manage-users", icon: <Users size={20} /> },
      ]
    : [
        { name: "Overview", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "My Bookings", path: "/dashboard/user/my-bookings", icon: <CalendarCheck size={20} /> },
        { name: "Profile", path: "/dashboard/user/profile", icon: <UserCircle size={20} /> },
        { name: "Settings", path: "/dashboard/user/settings", icon: <Settings size={20} /> },
      ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-zinc-950">
      {/* --- Sidebar Start --- */}
      <aside className="w-72 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <Briefcase size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase">
              Care<span className="text-blue-600">.xyz</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <p className="px-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Main Menu</p>
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.path} 
                href={link.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 group ${
                  isActive 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-500/25" 
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <span className={isActive ? "text-white" : "text-zinc-400 group-hover:text-blue-600 transition-colors"}>
                  {link.icon}
                </span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section in Sidebar */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-[2rem] flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-black">
                {session?.user?.name?.charAt(0)}
             </div>
             <div className="flex-1 overflow-hidden">
                <p className="text-sm font-black truncate">{session?.user?.name}</p>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{role}</p>
             </div>
             <button 
                onClick={() => signOut()}
                className="p-2 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
             >
                <LogOut size={20} />
             </button>
          </div>
        </div>
      </aside>
      {/* --- Sidebar End --- */}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
         {/* Top Header for Mobile & Desktop */}
         <header className="h-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 sticky top-0 z-10">
            <h2 className="font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Dashboard Overview</h2>
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"></div>
            </div>
         </header>

         <div className="p-8 md:p-12">
            {children}
         </div>
      </main>
    </div>
  );
}