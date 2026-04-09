"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Menu, X, Heart, LayoutDashboard, LogOut, LogIn, User, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile dropdown state
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
            <div className="flex items-center space-x-1 mr-6">
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
            </div>
            
            {/* Auth Logic with Dropdown */}
            <div className="flex items-center border-l border-zinc-200 dark:border-zinc-800 pl-6">
              {status === "authenticated" ? (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="relative h-8 w-8 rounded-full overflow-hidden bg-blue-100 dark:bg-blue-900 flex items-center justify-center border border-blue-200">
                      {session.user?.image ? (
                        <Image 
                          src={session.user.image} 
                          alt="Profile" 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <User size={18} className="text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                      {session.user.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 py-2 z-50 animate-in fade-in zoom-in duration-200">
                      <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-2">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{session.user.role}</p>
                        <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{session.user.email}</p>
                      </div>
                      
                      <Link 
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <LayoutDashboard size={18} className="text-zinc-400" />
                        Dashboard
                      </Link>
                      
                      <button 
                        onClick={() => {
                            setIsProfileOpen(false);
                            signOut();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <LogOut size={18} />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => signIn()} 
                    className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition flex items-center gap-2 cursor-pointer"
                  >
                    <LogIn size={18} />
                    Log In
                  </button>
                  <Link href="/register" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:scale-105 transition-all shadow-xl shadow-blue-500/20">
                    Register
                  </Link>
                </div>
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

        {/* Mobile Dropdown (Responsive) */}
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
            
            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-4">
              {status === "authenticated" ? (
                <div className="space-y-3">
                  <div className="px-5 mb-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 overflow-hidden relative">
                         {session.user?.image ? (
                            <Image src={session.user.image} alt="user" fill className="object-cover" />
                         ) : <User className="m-auto mt-2 text-blue-600" />}
                    </div>
                    <div>
                        <p className="text-sm font-black text-zinc-900 dark:text-white">{session.user.name}</p>
                        <p className="text-[10px] font-bold text-blue-600 uppercase">{session.user.role}</p>
                    </div>
                  </div>
                  <Link 
                    href="/dashboard" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-4 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-2xl font-bold shadow-lg"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { signOut(); setIsOpen(false); }} 
                    className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut size={18} />
                    Log Out
                  </button>
                </div>
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