"use client";
import React, { useState, useEffect } from 'react';
import { Star, Send, Quote, Loader2, User } from 'lucide-react';
import toast from 'react-hot-toast';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      if (data.data) setFeedbacks(data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      name: e.target.name.value,
      rating: rating,
      comment: e.target.comment.value,
    };

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Feedback submitted!");
        e.target.reset();
        setRating(5);
        fetchFeedbacks();
      }
    } catch (err) {
      toast.error("Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-zinc-950 px-6 transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-xl mx-auto">
          <h2 className="text-4xl font-black dark:text-white tracking-tight leading-tight">
            User <span className="text-blue-600">Experience</span> & Feedback
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-3 font-medium text-sm sm:text-base">
            Share your thoughts and read what our community is saying.
          </p>
        </div>

        {/* --- TOP: Input Form --- */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-blue-500/5 mb-24 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input 
                name="name" 
                type="text" 
                placeholder="Your Full Name" 
                className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 outline-none dark:text-white focus:ring-2 ring-blue-500/20 transition-all shadow-sm font-medium text-sm" 
                required 
              />
              <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800 rounded-2xl px-6 py-4 shadow-sm border border-zinc-100 dark:border-zinc-700">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Rating:</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star 
                      key={num} 
                      size={18} 
                      className={`cursor-pointer transition-all ${num <= rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300 dark:text-zinc-600"}`}
                      onClick={() => setRating(num)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <textarea 
              name="comment" 
              rows="3" 
              placeholder="How can we improve?" 
              className="w-full px-6 py-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 outline-none dark:text-white focus:ring-2 ring-blue-500/20 transition-all shadow-sm resize-none font-medium text-sm" 
              required
            ></textarea>
            
            <div className="flex justify-center md:justify-end pt-2">
                <button 
                  disabled={loading} 
                  className="w-full cursor-pointer md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-blue-600/20 text-sm"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <><Send size={16} /> Publish Feedback</>}
                </button>
            </div>
          </form>
        </div>

        {/* --- BOTTOM: Equal Height Slider Section --- */}
        <div className="relative px-2">
          {feedbacks.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="pb-16 !overflow-visible"
            >
              {feedbacks.map((f, i) => (
                <SwiperSlide key={i} className="!h-auto flex"> {/* !h-auto flex maintains uniform height */}
                  <div className="flex flex-col w-full min-h-[250px] p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm relative group hover:border-blue-500/30 transition-all duration-500">
                    <Quote className="absolute right-8 top-8 text-blue-600/5 group-hover:text-blue-600/10 transition-colors" size={50} />
                    
                    <div className="flex gap-0.5 mb-5">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star 
                          key={starIdx} 
                          size={14} 
                          className={`${starIdx < f.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-200 dark:text-zinc-700"}`} 
                        />
                      ))}
                    </div>

                    {/* Content Section */}
                    <div className="flex-grow"> 
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8 italic font-medium line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                        "{f.comment}"
                      </p>
                    </div>

                    {/* Footer - Always at bottom */}
                    <div className="mt-auto flex items-center gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-base shadow-inner shrink-0">
                        {f.name ? f.name[0].toUpperCase() : "U"}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-sm dark:text-zinc-100 truncate">{f.name}</h4>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Verified Contributor</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-[2rem] border-2 border-dashed border-zinc-100 dark:border-zinc-800">
                <User size={40} className="text-zinc-300 mx-auto mb-4" />
                <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">Waiting for the first inspiring feedback!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;