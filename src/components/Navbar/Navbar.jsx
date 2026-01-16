"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 transition-all duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
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
                    {/* Active Indicator Bar */}
                    <span className={`absolute bottom-0 w-5 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 group-hover:opacity-40 group-hover:translate-y-1"
                    }`}></span>
                  </Link>
                );
              })}
              
              <Link 
                href="/my-bookings" 
                className={`ml-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  pathname === "/my-bookings" 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                }`}
              >
                My Bookings
              </Link>
            </div>
            
            <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-6"></div>

            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition">
                Log In
              </Link>
              <Link href="/register" className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 py-2.5 rounded-xl text-sm font-bold hover:scale-105 transition-all active:scale-95 shadow-xl shadow-zinc-200 dark:shadow-none">
                Join Now
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
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
                    ? "bg-blue-600 text-white" 
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link 
              href="/my-bookings" 
              onClick={() => setIsOpen(false)}
              className={`block px-5 py-3 rounded-2xl font-black ${
                pathname === "/my-bookings" 
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" 
                : "text-blue-600 border border-blue-100 dark:border-blue-900/30"
              }`}
            >
              My Bookings
            </Link>
            <div className="grid grid-cols-2 gap-3 pt-6">
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-center py-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl font-bold text-zinc-700 dark:text-zinc-300">
                Log In
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="text-center py-4 bg-blue-600 text-white rounded-2xl font-bold">
                Join Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;