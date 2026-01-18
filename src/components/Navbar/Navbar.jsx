"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Menu, X, Heart, LayoutDashboard, LogOut, LogIn } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white transition-transform group-hover:scale-110">
              <Heart size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white">
              Care<span className="text-blue-600">.xyz</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link 
                    key={link.name} 
                    href={link.path} 
                    className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 flex flex-col items-center group ${
                      isActive 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 w-5 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 group-hover:opacity-40"
                    }`}></span>
                  </Link>
                );
              })}
              
              {/* Dashboard Link (Simple Entry) */}
              {status === "authenticated" && (
                <Link 
                  href="/dashboard" 
                  className={`ml-2 flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                    pathname.startsWith("/dashboard") 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-blue-50"
                  }`}
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
              )}
            </div>
            
            <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-6"></div>

            {/* Auth Logic */}
            <div className="flex items-center space-x-4">
              {status === "authenticated" ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end mr-1 leading-tight">
                    <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">{session.user.role}</span>
                    <span className="text-xs font-black text-zinc-800 dark:text-zinc-200">{session.user.name.split(' ')[0]}</span>
                  </div>

                  <button 
                    onClick={() => signOut()} 
                    className="cursor-pointer flex items-center gap-2 px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
                  >
                    <LogOut size={18} />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => signIn()} 
                    className="cursor-pointer text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition flex items-center gap-2"
                  >
                    <LogIn size={18} />
                    Log In
                  </button>
                  <Link href="/register" className="cursor-pointer bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:scale-105 transition-all shadow-xl shadow-blue-500/20">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors cursor-pointer" 
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-8 pt-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  href={link.path}
                  onClick={() => setIsOpen(false)} 
                  className={`block px-5 py-3 rounded-2xl font-bold transition-all ${
                    isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="grid grid-cols-1 gap-3 pt-6">
              {status === "authenticated" ? (
                <>
                  <Link 
                    href="/dashboard" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-4 bg-zinc-900 text-white rounded-2xl font-bold shadow-lg"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard ({session.user.role})
                  </Link>
                  <button 
                    onClick={() => { signOut(); setIsOpen(false); }} 
                    className="py-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut size={18} />
                    Log Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => { signIn(); setIsOpen(false); }} 
                    className="py-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer"
                  >
                    Log In
                  </button>
                  <Link 
                    href="/register" 
                    onClick={() => setIsOpen(false)} 
                    className="text-center py-4 bg-blue-600 text-white rounded-2xl font-bold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;