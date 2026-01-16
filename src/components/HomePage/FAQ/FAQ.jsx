"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "আপনাদের সার্ভিস চার্জ বা খরচ কত?",
    answer: "আমাদের খরচ নির্ভর করে আপনি কোন ধরণের সার্ভিস নিচ্ছেন তার ওপর। সাধারণ কেয়ারগিভার এবং স্পেশালিস্ট নার্সিংয়ের রেট আলাদা। বিস্তারিত জানতে আমাদের 'Pricing' পেজ দেখুন বা সরাসরি কল করুন।"
  },
  {
    question: "সিকিউরিটি বা নিরাপত্তার ব্যবস্থা কেমন?",
    answer: "আমাদের প্রত্যেক কেয়ারগিভারের ব্যাকগ্রাউন্ড ভেরিফাইড এবং পুলিশ ক্লিয়ারেন্স চেক করা হয়। এছাড়া কাজের সময় আমরা নিয়মিত মনিটরিং নিশ্চিত করি।"
  },
  {
    question: "আমি কি কেয়ারগিভার পরিবর্তন করতে পারি?",
    answer: "হ্যাঁ, অবশ্যই। যদি কোনো কারণে আপনার মনে হয় কেয়ারগিভারের সাথে আপনি মানিয়ে নিতে পারছেন না, তবে আমাদের জানালে আমরা ২৪ ঘণ্টার মধ্যে পরিবর্তন করে দেব।"
  },
  {
    question: "জরুরি প্রয়োজনে কত দ্রুত আপনাদের পাওয়া যাবে?",
    answer: "আমরা ২৪/৭ সাপোর্ট দিয়ে থাকি। কল করার ১-২ ঘণ্টার মধ্যেই আমরা প্রাথমিক সাহায্য বা কেয়ারগিভার পাঠানোর ব্যবস্থা করি।"
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
            <HelpCircle size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">জিজ্ঞাসিত প্রশ্নাবলী</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">
            সাধারণ কিছু <span className="text-blue-600">জিজ্ঞাসা</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            আমাদের সেবা সম্পর্কে আপনার মনে থাকা সাধারণ প্রশ্নগুলোর উত্তর এখানে পেতে পারেন।
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className={`border rounded-2xl transition-all duration-300 ${
                activeIndex === index 
                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/5 shadow-lg' 
                : 'border-zinc-200 dark:border-zinc-800 bg-transparent'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <span className={`text-lg font-bold transition-colors ${
                  activeIndex === index ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-800 dark:text-zinc-200'
                }`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-blue-600 text-white rotate-0' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                }`}>
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-1">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Support Link */}
        <div className="mt-12 text-center p-8 rounded-[2rem] bg-zinc-100 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700">
          <p className="text-zinc-600 dark:text-zinc-400 font-medium">
            আপনার প্রশ্নের উত্তর খুঁজে পাচ্ছেন না? 
            <button className="ml-2 text-blue-600 font-bold hover:underline">আমাদের সাথে সরাসরি কথা বলুন</button>
          </p>
        </div>

      </div>
    </section>
  );
};

export default FAQ;