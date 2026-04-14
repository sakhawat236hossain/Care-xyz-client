// app/dashboard/all-messages/page.jsx
"use client";
import { useEffect, useState } from "react";
import { Mail, Calendar, User, MessageSquare, Phone, Clock, ExternalLink, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/contact");
      const data = await res.json();
      setMessages(data.data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/contact?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Message deleted!");
        setMessages(messages.filter((msg) => msg._id !== id));
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Failed to delete message");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[500px]">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black text-zinc-900 dark:text-white">Inquiries</h1>
        <p className="text-sm font-bold bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-xl text-zinc-500">
          Total: {messages.length}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {messages.length === 0 ? (
          <p className="text-center py-20 text-zinc-500 font-medium">No inquiries found.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-xl group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex items-center gap-4">
                  {msg.image ? (
                    <img src={msg.image} className="h-14 w-14 rounded-2xl object-cover" alt="" />
                  ) : (
                    <div className="h-14 w-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center font-bold">{msg.name[0]}</div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg dark:text-white">{msg.name}</h3>
                    <div className="flex gap-4 text-xs text-zinc-500 mt-1 font-medium">
                      <span className="flex items-center gap-1"><Mail size={12}/> {msg.email}</span>
                      <span className="flex items-center gap-1 text-blue-600"><Phone size={12}/> {msg.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleDelete(msg._id)}
                    disabled={deletingId === msg._id}
                    className="p-3 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                  >
                    {deletingId === msg._id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                  </button>
                  <a href={`mailto:${msg.email}`} className="p-3 bg-blue-50 dark:bg-blue-900/10 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <div className="mt-6 pl-4 border-l-2 border-blue-600/20">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Subject: {msg.subject}</p>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{msg.message}</p>
                <div className="mt-4 flex gap-4 text-[10px] font-bold text-zinc-400 uppercase">
                   <span className="flex items-center gap-1"><Calendar size={10}/> {new Date(msg.createdAt).toLocaleDateString()}</span>
                   <span className="flex items-center gap-1"><Clock size={10}/> {new Date(msg.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}