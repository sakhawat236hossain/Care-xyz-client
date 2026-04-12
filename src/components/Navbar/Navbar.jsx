"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Menu, X, Heart, LayoutDashboard, LogOut, LogIn, User, ChevronDown, Bell } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session, status } = useSession();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 transition-all duration-300">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="relative flex items-center justify-center h-10 w-10 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/30 transition-all group-hover:rotate-12">
              <Heart size={20} fill="currentColor" />
            </div>
            <div className="flex flex-col -space-y-1">
                <span className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    Care<span className="text-indigo-600">.xyz</span>
                </span>
                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">Premium Care</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex cursor-pointer items-center bg-zinc-100/50 dark:bg-zinc-900/50 p-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link 
                    key={link.name} 
                    href={link.path} 
                    className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                      isActive 
                      ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-white shadow-sm ring-1 ring-zinc-200/50 dark:ring-zinc-700/50" 
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="flex items-center gap-4">
              {status === "authenticated" ? (
                <div className="relative flex items-center gap-3" ref={dropdownRef}>
                  <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    <Bell size={20} />
                  </button>

                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2.5 pl-1.5 pr-3 cursor-pointer py-1.5 rounded-full bg-zinc-900 dark:bg-white hover:ring-4 hover:ring-indigo-500/10 transition-all"
                  >
                    <div className="relative h-8 w-8 cursor-pointer rounded-full overflow-hidden border-2 border-zinc-800 dark:border-zinc-200">
                      {session.user?.image ? (
                        <Image 
                          src={session.user.image} 
                          alt="Profile" 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                             <User size={16} className="text-indigo-600" />
                        </div>
                      )}
                    </div>
                    <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Enhanced Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 cursor-pointer top-full mt-4 w-64 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center gap-3 p-3 mb-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                         <div className="h-10 w-10 rounded-lg overflow-hidden relative border border-zinc-200 dark:border-zinc-700">
                             {session.user?.image ? <Image src={session.user.image} alt="user" fill className="object-cover" /> : <User className="m-auto mt-2" />}
                         </div>
                         <div className="flex flex-col overflow-hidden">
                            <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{session.user.name}</p>
                            <p className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-tight">{session.user.role || 'Member'}</p>
                         </div>
                      </div>
                      
                      <Link 
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-white rounded-lg transition-all"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                      
                      <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1 mx-2" />
                      
                      <button 
                        onClick={() => { setIsProfileOpen(false); signOut(); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => signIn()} 
                    className="text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 transition px-4 py-2"
                  >
                    Login
                  </button>
                  <Link href="/register" className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2.5 rounded-xl cursor-pointer bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800" 
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu - Enhanced Overlay */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full mt-2 mx-4 p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-3xl animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link 
                    key={link.name} 
                    href={link.path}
                    onClick={() => setIsOpen(false)} 
                    className={`px-5 py-3.5 rounded-xl font-bold transition-all ${
                      isActive 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              {status === "authenticated" ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-2 mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-100 overflow-hidden relative border-2 border-indigo-50">
                        {session.user?.image ? <Image src={session.user.image} alt="user" fill className="object-cover" /> : <User className="m-auto mt-3" />}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-white">{session.user.name}</p>
                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{session.user.role}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link 
                        href="/dashboard" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center cursor-pointer gap-2 py-3.5 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white rounded-xl font-bold"
                    >
                        <LayoutDashboard size={18} />
                        Portal
                    </Link>
                    <button 
                        onClick={() => { signOut(); setIsOpen(false); }} 
                        className="py-3.5 bg-red-50 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                        <LogOut size={18} />
                        Exit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => { signIn(); setIsOpen(false); }} 
                    className="py-3.5 bg-zinc-100 cursor-pointer dark:bg-zinc-800 rounded-xl font-bold text-zinc-700 dark:text-zinc-300"
                  >
                    Login
                  </button>
                  <Link 
                    href="/register" 
                    onClick={() => setIsOpen(false)} 
                    className="text-center py-3.5 cursor-pointer bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20"
                  >
                    Join Now
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