"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Loader2, ArrowLeft, Calendar, MapPin, Clock, DollarSign, 
  Package, Hash 
} from 'lucide-react';

const BookingDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/bookings/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setBooking(data);
      } catch {
        console.error("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl font-black text-zinc-300 tracking-widest uppercase">
            Booking Not Found
          </p>
          <p className="mt-3 text-zinc-500">The requested booking could not be found.</p>
        </div>
      </div>
    );
  }

  const bookingDate = booking.bookedAt?.$date 
    ? new Date(booking.bookedAt.$date) 
    : new Date(booking.bookedAt);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to History
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              Booking <span className="text-blue-600">Details</span>
            </h1>
            <div className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
              <Hash className="h-4 w-4 text-blue-600" />
              Ref: {booking._id.toString().slice(-8).toUpperCase()}
            </div>
          </div>

          <div className="inline-flex items-center gap-3 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm px-5 py-2.5 border border-zinc-200 dark:border-zinc-700">
            <div className={`h-3 w-3 rounded-full animate-pulse ${
              booking.status === 'pending' 
                ? 'bg-amber-500' 
                : booking.status === 'confirmed' 
                ? 'bg-emerald-500' 
                : 'bg-blue-500'
            }`} />
            <span className="text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
              {booking.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 xl:gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[5/3] overflow-hidden rounded-3xl shadow-2xl group">
              <img
                src={booking.serviceImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200"}
                alt={booking.serviceTitle}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                <span className="inline-block text-xs font-black uppercase tracking-widest text-blue-300/90">
                  Service
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {booking.serviceTitle}
                </h2>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <InfoCard 
                  icon={<Calendar className="h-5 w-5" />}
                  label="Scheduled Date"
                  value={bookingDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                />

                <InfoCard 
                  icon={<Clock className="h-5 w-5" />}
                  label="Work Duration"
                  value={booking.duration || "Not specified"}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <InfoCard 
                  icon={<MapPin className="h-5 w-5 text-rose-600" />}
                  label="Service Location"
                  value={
                    <div className="space-y-1">
                      <p className="font-medium text-zinc-900 dark:text-white">
                        {booking.location?.area}, {booking.location?.district}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {booking.location?.address}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 italic">
                        {booking.location?.region} Region
                      </p>
                    </div>
                  }
                  isComplex
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-7 lg:sticky lg:top-8 lg:h-fit">
            {/* Price Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-10 text-white shadow-2xl">
              <div className="absolute -right-12 -bottom-12 opacity-20">
                <DollarSign size={180} className="rotate-12" />
              </div>
              
              <p className="text-sm font-bold uppercase tracking-wider text-blue-100/80">
                Total Amount
              </p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold">৳</span>
                <span className="text-6xl lg:text-7xl font-black tracking-tighter">
                  {booking.totalCost?.toLocaleString() || "—"}
                </span>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-5 py-2 text-sm font-bold">
                <Package size={16} />
                Payment Completed
              </div>
            </div>

            {/* Client Info */}
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 backdrop-blur-sm p-8 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6">
                Client Information
              </p>

              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl overflow-hidden border-2 border-blue-500/30 flex-shrink-0">
                  <img
                    src={booking.userImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt={booking.userName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-lg text-zinc-900 dark:text-white">
                    {booking.userName}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {booking.userEmail}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Service ID
                </p>
                <p className="mt-1 font-mono text-sm text-zinc-600 dark:text-zinc-400 break-all">
                  {booking.serviceId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Info Card Component
function InfoCard({ icon, label, value, isComplex = false }) {
  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-7 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
        {icon}
        {label}
      </div>
      
      {isComplex ? (
        value
      ) : (
        <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
          {value}
        </p>
      )}
    </div>
  );
}

export default BookingDetails;