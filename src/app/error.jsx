"use client";
import "./globals.css"; 

import { useEffect } from "react";
import { RefreshCcw, Home, AlertCircle } from "lucide-react"; 

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("System Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none text-center backdrop-blur-sm">
        
        {/* Error Icon Section */}
        <div className="w-24 h-24 bg-red-50 dark:bg-red-950/30 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 hover:rotate-0 transition-transform duration-500">
           <span className="text-5xl text-red-500">⚠️</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
          সিস্টেমে সাময়িক বিভ্রাট!
        </h2>
        
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 leading-relaxed">
           আমাদের সার্ভারে ছোট একটি সমস্যা হয়েছে। চিন্তার কিছু নেই, আমরা আপনার তথ্য সুরক্ষিত রেখেছি। দয়া করে পেজটি রিফ্রেশ দিয়ে দেখুন।
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95"
          >
            <span>আবার চেষ্টা করুন</span>
          </button>
          
          <button
            onClick={() => window.location.href = "/"}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95"
          >
            হোমে যান
          </button>
        </div>

        {/* System Message */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
            Support ID: ERR_CARE_XYZ_001
          </p>
        </div>
      </div>
    </div>
  );
}