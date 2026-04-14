// app/dashboard/all-messages/page.jsx
"use client";
import { useEffect, useState } from "react";
import { Mail, Calendar, User, MessageSquare, Trash2 } from "lucide-react";

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
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Customer Inquiries</h1>
          <p className="text-zinc-500 mt-1">Total {messages.length} messages received</p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full">
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">Admin Panel</span>
        </div>
      </div>

      <div className="grid gap-6">
        {messages.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <MessageSquare className="mx-auto text-zinc-300 mb-4" size={48} />
            <p className="text-zinc-500 font-medium">No messages in the inbox yet.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="group bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-xl">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white">{msg.name}</h3>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="text-sm text-zinc-500 flex items-center gap-1.5"><Mail size={14}/> {msg.email}</span>
                      <span className="text-sm text-zinc-400 flex items-center gap-1.5"><Calendar size={14}/> {new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">Subject: {msg.subject || 'General Inquiry'}</div>
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-2xl text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed border border-zinc-100 dark:border-zinc-800/50">
                   {msg.message}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}