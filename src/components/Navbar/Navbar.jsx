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
    { name: "Services", path: "/#services" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-tr from-blue-600 to-blue-400 p-2 rounded-xl text-white shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-800">
              Care<span className="text-blue-600">.xyz</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center space-x-1 mr-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname === link.path ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/my-bookings" className={`px-4 py-2 rounded-xl text-sm font-semibold ${pathname === "/my-bookings" ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"}`}>
                My Bookings
              </Link>
            </div>
            
            <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>

            <div className="flex items-center space-x-3 ml-4">
              <Link href="/login" className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-blue-600 transition">Log In</Link>
              <Link href="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all">Join Now</Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
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
          <div className="md:hidden pb-6 space-y-2 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                onClick={() => setIsOpen(false)} 
                className="block px-4 py-3 text-gray-600 font-medium hover:bg-blue-50 rounded-xl transition"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/my-bookings" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-blue-600 font-bold hover:bg-blue-50 rounded-xl"
            >
              My Bookings
            </Link>
            <div className="grid grid-cols-2 gap-3 pt-4 px-4">
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-center py-3 border border-gray-200 rounded-xl font-bold text-gray-700">Log In</Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="text-center py-3 bg-blue-600 text-white rounded-xl font-bold">Join Now</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;