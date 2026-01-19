"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  CreditCard, 
  Loader2, 
  Package, 
  Clock, 
  Eye, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const MyBookings = () => {
    const { data: session } = useSession();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        if (session?.user?.email) {
            try {
                const res = await fetch(`/api/my-bookings/${session.user.email}`);
                const data = await res.json();
                setBookings(data);
            } catch (err) {
                console.error("Failed to load bookings:", err);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        loadData();
    }, [session]);

    
    const handleCancel = async (id) => {
        const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
        if (!confirmCancel) return;

        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                toast.success("Booking cancelled successfully!");
                loadData(); 
            }
        } catch (err) {
            toast.error("Failed to cancel booking");
        }
    };

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center font-black uppercase italic tracking-widest text-blue-600">
            <Loader2 className="animate-spin mr-2" /> Connecting to Database...
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                        My <span className="text-blue-600">History</span>
                    </h1>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mt-2">Manage your service requests</p>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-[10px] font-black uppercase text-zinc-400">Total Requests</p>
                    <p className="text-2xl font-black">{bookings.length}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {bookings.length > 0 ? (
                    bookings.map((item) => (
                        <div key={item._id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                            
                            {/* Status Stripe */}
                            <div className={`absolute left-0 top-0 bottom-0 w-2 ${
                                item.status === 'pending' ? 'bg-orange-400' : 'bg-emerald-500'
                            }`} />

                            <div className="flex flex-col lg:flex-row justify-between gap-8">
                                {/* Left Section: Info */}
                                <div className="flex items-start gap-6">
                                    <div className="bg-blue-600 text-white p-5 rounded-3xl shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform hidden sm:block">
                                        <Package size={28} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl font-black uppercase tracking-tight text-zinc-800 dark:text-zinc-100 italic">
                                                {item.serviceTitle}
                                            </h3>
                                            <span className={`px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                                item.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            }`}>
                                                {item.status || "Pending"}
                                            </span>
                                        </div>
                                        
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-zinc-400 font-bold text-[10px] uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-600"/> {item.bookedAt ? new Date(item.bookedAt).toLocaleDateString() : 'N/A'}</span>
                                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-zinc-500"/> {item.duration}</span>
                                            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-red-500"/> {item.location?.district}, {item.location?.area}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section: Price & Actions */}
                                <div className="flex flex-col sm:flex-row items-center gap-6 ml-auto md:ml-0 w-full lg:w-auto">
                                    <div className="text-left md:text-right flex-1 sm:flex-none">
                                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Total Paid</p>
                                        <p className="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter">
                                            ${item.totalCost}
                                        </p>
                                    </div>
                                    
                                    {/* --- Buttons --- */}
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <Link 
                                            href={`/dashboard/user/my-bookings/${item._id}`}
                                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black p-4 rounded-2xl transition-all duration-300 font-black text-[10px] uppercase tracking-widest"
                                        >
                                            <Eye size={16} /> Details
                                        </Link>
                                        
                                        <button 
                                            onClick={() => handleCancel(item._id)}
                                            className="flex-1 cursor-pointer sm:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-4 rounded-2xl transition-all duration-300 font-black text-[10px] uppercase tracking-widest group/btn"
                                        >
                                            <Trash2 size={16} className="group-hover/btn:animate-bounce" /> Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <AlertCircle className="mx-auto text-zinc-300 mb-4" size={48} />
                        <p className="font-black text-zinc-400 uppercase tracking-widest">No Bookings Found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;