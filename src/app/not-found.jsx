import Link from 'next/link';
import "./globals.css"; 

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        
        {/* Visual Element */}
        <div className="relative flex justify-center">
          <h1 className="text-[12rem] md:text-[18rem] font-black text-gray-100 dark:text-gray-900 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <div className="bg-blue-600/10 dark:bg-blue-400/10 p-6 rounded-full backdrop-blur-3xl">
              <span className="text-7xl animate-bounce inline-block">🔍</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 relative -mt-12 md:-mt-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            আপনি কি হারিয়ে গেছেন?
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
            আমরা যে পাতাটি খুঁজছি সেটি খুঁজে পাচ্ছি না। সম্ভবত ঠিকানাটি ভুল ছিল অথবা পেজটি সরিয়ে নেওয়া হয়েছে। 
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link 
            href="/" 
            className="group relative w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-[0_20px_50px_rgba(37,99,235,0.2)] transition-all active:scale-95"
          >
            <span className="relative z-10">হোমপেজে ফিরে যান</span>
            <div className="absolute inset-0 bg-white/20 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </Link>
          
          <Link 
            href="/#services" 
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95"
          >
            সার্ভিসগুলো দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
}