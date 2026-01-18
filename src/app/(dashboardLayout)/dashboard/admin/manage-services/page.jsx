"use client";
import React, { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2, Edit, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Edit Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/admin/all-services');
            const data = await res.json();
            setServices(data);
        } catch (err) {
            toast.error("Failed to load services");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchServices(); }, []);

    const handleDeleteService = async (id) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        try {
            const res = await fetch(`/api/admin/delete-service/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Service removed!");
                fetchServices(); 
            }
        } catch (err) {
            toast.error("Failed to delete");
        }
    };

    const openEditModal = (service) => {
        setEditingService({ ...service });
        setIsEditModalOpen(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/admin/update-service/${editingService._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingService), 
            });

            if (res.ok) {
                toast.success("Service updated successfully!");
                setIsEditModalOpen(false);
                fetchServices();
            } else {
                toast.error("Update failed");
            }
        } catch (err) {
            toast.error("An error occurred");
        }
    };

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    return (
        <div className="max-w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                        Manage <span className="text-blue-600">Services</span>
                    </h1>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2">Control your marketplace offerings</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                    <Plus size={18} /> Add New Service
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Service Info</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Category</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Price</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {services.map((service) => (
                                <tr key={service._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                                <img src={service.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-zinc-900 dark:text-white uppercase text-sm tracking-tight">{service.title}</span>
                                                <span className="text-[10px] font-bold text-zinc-400">ID: {service._id.slice(-6)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-black uppercase text-zinc-600 dark:text-zinc-400">
                                            {service.category}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className="font-black text-blue-600">${service.price}</span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => openEditModal(service)} className="p-2 cursor-pointer bg-blue-500/10 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDeleteService(service._id)} className="p-2 cursor-pointer bg-red-500/10 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- Edit Service Modal --- */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-[3rem] p-10 shadow-2xl relative border border-zinc-200 dark:border-zinc-800">
                        <button onClick={() => setIsEditModalOpen(false)} className="absolute top-8 right-8 text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                        
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">
                            Update <span className="text-blue-600">Service</span>
                        </h2>
                        
                        <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-2">Service Title</label>
                                <input 
                                    type="text" 
                                    value={editingService.title}
                                    onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                                    className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl mt-1 font-bold border border-transparent focus:border-blue-500 outline-none transition-all uppercase text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-2">Category</label>
                                <input 
                                    type="text" 
                                    value={editingService.category}
                                    onChange={(e) => setEditingService({...editingService, category: e.target.value})}
                                    className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl mt-1 font-bold border border-transparent focus:border-blue-500 outline-none transition-all uppercase text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-2">Price ($)</label>
                                <input 
                                    type="number" 
                                    value={editingService.price}
                                    onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                                    className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl mt-1 font-bold border border-transparent focus:border-blue-500 outline-none transition-all text-sm"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-2">Image URL</label>
                                <input 
                                    type="text" 
                                    value={editingService.image}
                                    onChange={(e) => setEditingService({...editingService, image: e.target.value})}
                                    className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl mt-1 font-bold border border-transparent focus:border-blue-500 outline-none transition-all text-sm"
                                    required
                                />
                            </div>

                            <button type="submit" className="cursor-pointer md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl font-black uppercase tracking-widest mt-4 shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]">
                                Save Changes & Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageServices;