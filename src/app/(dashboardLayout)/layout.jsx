"use client";
import "../globals.css";
import { useState } from "react";
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
  UserCircle,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const links =
    role === "admin"
      ? [
          {
            name: "Overview",
            path: "/dashboard",
            icon: <LayoutDashboard size={20} />,
          },
          {
            name: "All Bookings",
            path: "/dashboard/admin/all-bookings",
            icon: <CalendarCheck size={20} />,
          },
          {
            name: "Manage Services",
            path: "/dashboard/admin/manage-services",
            icon: <Briefcase size={20} />,
          },
          {
            name: "Manage Users",
            path: "/dashboard/admin/manage-users",
            icon: <Users size={20} />,
          },
          {
            name: "Add Service",
            path: "/dashboard/admin/add-service",
            icon: <PlusCircle size={20} />,
          },
        ]
      : [
          {
            name: "Overview",
            path: "/dashboard",
            icon: <LayoutDashboard size={20} />,
          },
          {
            name: "My Bookings",
            path: "/dashboard/user/my-bookings",
            icon: <CalendarCheck size={20} />,
          },
          {
            name: "Profile",
            path: "/dashboard/user/profile",
            icon: <UserCircle size={20} />,
          },
          {
            name: "Settings",
            path: "/dashboard/user/settings",
            icon: <Settings size={20} />,
          },
        ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Logo Area */}
      <div className="p-8 flex justify-between items-center shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
            <Briefcase size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase">
            Care<span className="text-blue-600">.xyz</span>
          </span>
        </Link>
        <button
          className="md:hidden p-2 text-zinc-500"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation Area - Scrollable if items are many */}
      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto scrollbar-hide">
        <p className="px-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">
          Main Menu
        </p>
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-500/25"
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <span
                className={
                  isActive
                    ? "text-white"
                    : "text-zinc-400 group-hover:text-blue-600 transition-colors"
                }
              >
                {link.icon}
              </span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Profile Area */}
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-[2rem] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-black flex-shrink-0">
            {session?.user?.name?.charAt(0)}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-black truncate">{session?.user?.name}</p>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
              {role}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="p-2 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-zinc-950 overflow-hidden">
      {/* --- Desktop Sidebar (Fixed) --- */}
      <aside className="w-72 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 hidden md:flex flex-col h-full shrink-0 sticky top-0">
        <SidebarContent />
      </aside>

      {/* --- Mobile Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- Mobile Drawer --- */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-zinc-900 z-[60] md:hidden transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent />
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top Navbar (Sticky) */}
        <header className="h-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 md:px-8 shrink-0 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-300"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h2 className="font-black text-zinc-900 dark:text-white uppercase tracking-tighter text-sm md:text-base truncate max-w-[150px] md:max-w-none">
              Dashboard /{" "}
              <span className="text-blue-600">
                {pathname.split("/").pop() || "Overview"}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-black text-xs text-blue-600 uppercase">
              {session?.user?.role?.charAt(0)}
            </div>
          </div>
        </header>

        {/* --- Scrollable Body Area --- */}
        <main className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
          <div className="p-4 md:p-12 min-h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
