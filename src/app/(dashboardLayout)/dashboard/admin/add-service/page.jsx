"use client";
import React, { useState } from 'react';
import { PlusCircle, Image as ImageIcon, Tag, DollarSign, Loader2, Upload, FileText, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadImageToCloudinary } from '@/hooks/Utils';

const AddServicePage = () => {
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null); 

    const handleAddService = async (e) => {
        e.preventDefault();
        
        if (!imageFile) {
            return toast.error("Please select an image first!");
        }

        setLoading(true);
        const form = e.target;
        
        try {
            // ১. ক্লাউডিনারিতে আপলোড
            const imageUrl = await uploadImageToCloudinary(imageFile);
            
            if (!imageUrl) {
                throw new Error("Image upload failed");
            }

            // ২. ডাটাবেজের অবজেক্ট স্ট্রাকচার অনুযায়ী ডাটা গোছানো
            const newService = {
                title: form.title.value,
                description: form.description.value,
                category: form.category.value,
                price_per_hour: parseFloat(form.price_per_hour.value), // $150
                image: imageUrl, 
                details: form.details.value, // Extra description
                price: form.price.value, // $50 (আপনার ডাটাবেজে এটি স্ট্রিং হিসেবে আছে দেখলাম)
            };

            // ৩. এপিআই কল
            const res = await fetch('/api/admin/add-service', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newService),
            });

            if (res.ok) {
                toast.success("Service Deployed Successfully!");
                form.reset();
                setImageFile(null);
            } else {
                toast.error("Failed to add service");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-10">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                    Add New <span className="text-blue-600">Service</span>
                </h1>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2">Cloudinary Integrated Listing</p>
            </div>

            <form onSubmit={handleAddService} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-10 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Title */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">
                            <Tag size={14} /> Service Title
                        </label>
                        <input name="title" type="text" placeholder="E.G. NEWBORN BABY CARE" required
                            className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl font-bold border border-transparent focus:border-blue-500 outline-none transition-all uppercase text-sm" />
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">
                            <Upload size={14} /> Service Image
                        </label>
                        <div className="relative group">
                            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required
                                className="w-full p-3.5 bg-zinc-50 dark:bg-zinc-800 rounded-2xl font-bold border border-dashed border-zinc-300 dark:border-zinc-700 focus:border-blue-500 outline-none transition-all text-xs cursor-pointer file:hidden" />
                            <span className="absolute right-4 top-4 text-[9px] font-black uppercase text-blue-600">
                                {imageFile ? "Selected" : "Browse"}
                            </span>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Category</label>
                        <input name="category" type="text" placeholder="E.G. BABY CARE" required
                            className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl font-bold border border-transparent focus:border-blue-500 outline-none transition-all uppercase text-sm" />
                    </div>

                    {/* Price Per Hour */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">
                            <Clock size={14} /> Price Per Hour ($)
                        </label>
                        <input name="price_per_hour" type="number" placeholder="150" required
                            className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl font-bold border border-transparent focus:border-blue-500 outline-none transition-all text-sm" />
                    </div>

                    {/* Total/Fixed Price */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">
                            <DollarSign size={14} /> Fixed Price ($)
                        </label>
                        <input name="price" type="text" placeholder="50" required
                            className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl font-bold border border-transparent focus:border-blue-500 outline-none transition-all text-sm" />
                    </div>

                    {/* Short Description */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Short Description</label>
                        <textarea name="description" rows="2" placeholder="SHORT SUMMARY..." required
                            className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl font-bold border border-transparent focus:border-blue-500 outline-none transition-all text-sm"></textarea>
                    </div>

                    {/* Detailed Info */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">
                            <FileText size={14} /> Detailed Info
                        </label>
                        <textarea name="details" rows="4" placeholder="FULL SERVICE DETAILS..." required
                            className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl font-bold border border-transparent focus:border-blue-500 outline-none transition-all text-sm"></textarea>
                    </div>
                </div>

                <button disabled={loading} type="submit" 
                    className="w-full cursor-pointer mt-10 bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="animate-spin" /> : <><PlusCircle size={20} /> Deploy Service</>}
                </button>
            </form>
        </div>
    );
};

export default AddServicePage;