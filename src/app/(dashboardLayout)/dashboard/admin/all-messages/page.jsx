// app/dashboard/all-messages/page.jsx
"use client";
import { useEffect, useState } from "react";
import { Mail, Calendar, User, MessageSquare, Phone, Clock, ExternalLink } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/admin/contact");
        const data = await res.json();
        setMessages(data.data || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[500px]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-zinc-500 font-medium animate-pulse">Loading inquiries...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 bg-white dark:bg-transparent min-h-screen">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Inbox <span className="text-blue-600">.</span>
          </h1>
          <p className="text-zinc-500 mt-2 flex items-center gap-2 font-medium">
            <MessageSquare size={18} /> You have {messages.length} inquiries to review
          </p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 px-5 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></div>
          <span className="text-zinc-700 dark:text-zinc-300 text-xs font-bold uppercase tracking-widest">Live Updates</span>
        </div>
      </div>

      {/* --- Messages Grid --- */}
      <div className="grid grid-cols-1 gap-8">
        {messages.length === 0 ? (
          <div className="text-center py-32 bg-zinc-50 dark:bg-zinc-900/30 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="h-20 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="text-zinc-300" size={32} />
            </div>
            <p className="text-zinc-500 font-bold text-lg">Your inbox is empty!</p>
            <p className="text-zinc-400 text-sm">When users contact you, they will appear here.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="group relative bg-white dark:bg-zinc-900/50 p-1 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-2xl hover:shadow-blue-500/5">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  
                  {/* User Identity Info */}
                  <div className="flex items-start gap-5">
                    <div className="relative">
                      {msg.image ? (
                        <img src={msg.image} alt={msg.name} className="h-16 w-16 rounded-[1.2rem] object-cover ring-4 ring-zinc-50 dark:ring-zinc-800/50" />
                      ) : (
                        <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-[1.2rem] flex items-center justify-center font-black text-xl">
                          {msg.name.charAt(0)}
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 border-4 border-white dark:border-zinc-900 rounded-full"></div>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-black text-xl text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors">{msg.name}</h3>
                      <div className="flex flex-wrap gap-y-2 gap-x-4">
                        <a href={`mailto:${msg.email}`} className="text-sm text-zinc-500 hover:text-blue-500 flex items-center gap-1.5 transition-colors">
                          <Mail size={14} /> {msg.email}
                        </a>
                        <a href={`tel:${msg.phone}`} className="text-sm text-zinc-500 hover:text-emerald-500 flex items-center gap-1.5 transition-colors font-semibold">
                          <Phone size={14} /> {msg.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 dark:text-zinc-400 text-[11px] font-bold">
                      <Clock size={12} /> {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-zinc-400 text-[11px] font-bold flex items-center gap-1">
                      <Calendar size={12} /> {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Subject and Message Content */}
                <div className="mt-8 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600/20 rounded-full"></div>
                  <div className="pl-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-2">
                      Subject: {msg.subject}
                    </div>
                    <div className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed font-medium bg-zinc-50/50 dark:bg-zinc-800/30 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                      {msg.message}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-3">
                    <button className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-blue-600 transition-colors flex items-center gap-2">
                        Mark as Read
                    </button>
                    <a href={`mailto:${msg.email}`} className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-bold hover:scale-105 transition-transform flex items-center gap-2">
                        Reply <ExternalLink size={14} />
                    </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}