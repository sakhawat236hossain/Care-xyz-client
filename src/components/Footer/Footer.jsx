import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & About */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              {/* dark:text-white */}
              <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
                Care<span className="text-blue-600">.xyz</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
              আপনার পরিবারের সদস্যদের নিরাপদ এবং নির্ভরযোগ্য সেবা দিতে আমরা প্রতিশ্রুতিবদ্ধ। শিশু, বৃদ্ধ এবং অসুস্থ ব্যক্তিদের জন্য বিশেষায়িত কেয়ারগিভিং সার্ভিস।
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About Us</Link></li>
              <li><Link href="/#services" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Our Services</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact Support</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/service/baby-care" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Baby Sitting</Link></li>
              <li><Link href="/service/elderly-care" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Elderly Service</Link></li>
              <li><Link href="/service/sick-care" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home Nursing</Link></li>
              <li><Link href="/#services" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Emergency Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center space-x-3">
                <span className="bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded-md text-blue-600 dark:text-blue-400">📍</span>
                <span>Sector 10, Uttara, Dhaka</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded-md text-blue-600 dark:text-blue-400">📞</span>
                <span>+880 1851121472</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded-md text-blue-600 dark:text-blue-400">✉️</span>
                <span>hmdsakhawat236@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500 dark:text-gray-400 font-medium">
          <p>© {currentYear} Care.xyz. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;