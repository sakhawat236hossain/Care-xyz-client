"use client";
import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllBookings = async () => {
        try {
            const res = await fetch(`/api/admin/all-bookings?t=${new Date().getTime()}`, {
                cache: 'no-store'
            });
            const data = await res.json();
            setBookings(data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllBookings();

        const interval = setInterval(() => {
            fetchAllBookings();
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`/api/admin/update-status/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            
            const data = await res.json();

            if (res.ok) {
                toast.success(`Booking ${newStatus} successfully!`);
                await fetchAllBookings(); 
            } else {
                toast.error(data.message || "Failed to update");
            }
        } catch (err) {
            toast.error("Update failed");
        }
    };

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    return (
        <div className="max-w-full">
            <div className="mb-10">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                    Manage <span className="text-blue-600">All Bookings</span>
                </h1>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2">Administrative Control Center</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">User / Service</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Location</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Amount</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex flex-col">
                                            <span className="font-black text-zinc-900 dark:text-white uppercase text-sm tracking-tight">
                                                {booking.serviceTitle}
                                            </span>
                                            <span className="text-[10px] font-bold text-zinc-400">
                                                {booking.userEmail}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-6">
                                        <div className="flex flex-col text-[11px] font-bold text-zinc-500 uppercase">
                                            <span>{booking.location?.area}, {booking.location?.district}</span>
                                            <span className="text-[9px] text-zinc-400 normal-case font-medium">{booking.location?.address}</span>
                                        </div>
                                    </td>

                                    <td className="p-6">
                                        <span className="font-black text-blue-600">${booking.totalCost}</span>
                                    </td>

                                    <td className="p-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                                            booking.status === 'confirmed' 
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                            : booking.status === 'cancelled'
                                            ? 'bg-red-50 text-red-600 border-red-100'
                                            : 'bg-orange-50 text-orange-600 border-orange-100'
                                        }`}>
                                            {booking.status || 'pending'}
                                        </span>
                                    </td>

                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            {/* Confirm Button */}
                                            {booking.status !== 'confirmed' && booking.status !== 'cancelled' && (
                                                <button 
                                                    onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                                                    className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                            )}

                                            {/* Cancel Button */}
                                            {booking.status !== 'cancelled' && (
                                                <button 
                                                    onClick={() => handleUpdateStatus(booking._id, 'cancelled')}
                                                    className="p-2 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {bookings.length === 0 && (
                    <div className="p-20 text-center font-black text-zinc-400 uppercase tracking-widest">
                        No bookings found in the system.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllBookings;