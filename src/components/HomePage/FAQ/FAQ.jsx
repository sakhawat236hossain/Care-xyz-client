"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  MessageCircleQuestion // Corrected Icon Name
} from 'lucide-react';

const faqData = [
  {
    question: "What are your service charges or costs?",
    answer: "Our pricing depends on the type of service you require. General caregiving and specialist nursing have different rates. Please visit our 'Pricing' page for a detailed breakdown or contact us for a custom quote."
  },
  {
    question: "How do you ensure the security of patients?",
    answer: "Every caregiver undergoes a rigorous background check, including criminal record verification and professional reference checks. We also conduct regular monitoring and quality audits during their service period."
  },
  {
    question: "Can I request a change of caregiver?",
    answer: "Yes, absolutely. If for any reason you feel the assigned caregiver isn't the right fit for your family, let us know and we will arrange a replacement within 24 hours at no extra administrative cost."
  },
  {
    question: "How quickly can I get support in an emergency?",
    answer: "We offer 24/7 support. Depending on your location, we can typically dispatch an emergency assistant or arrange a professional caregiver within 1 to 2 hours of your initial call."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-600/20 text-blue-600 dark:text-blue-400">
            <HelpCircle size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Common <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto font-medium">
            Quick answers to the most frequent inquiries about our services.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index}
                className={`overflow-hidden transition-all duration-300 rounded-2xl border ${
                  isActive 
                  ? 'border-blue-200 dark:border-blue-900/50 bg-blue-50/20 dark:bg-blue-900/10 shadow-sm' 
                  : 'border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <span className={`text-sm md:text-base font-bold transition-colors ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-700 dark:text-zinc-200'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                  }`}>
                    {isActive ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-[13px] md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Mini Support Box */}
        <div className="mt-10 p-6 rounded-2xl bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold text-sm">Still have questions?</h4>
            <p className="text-zinc-500 text-xs">We're available 24/7 to help you.</p>
          </div>
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all flex items-center gap-2">
            <MessageCircleQuestion size={16} />
            Contact Us
          </button>
        </div>

      </div>
    </section>
  );
};

export default FAQ;