"use client";
import React, { useEffect, useState } from 'react';
import { Loader2, ShieldCheck, User, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/all-users');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            toast.error("Error loading users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleRoleUpdate = async (id, newRole) => {
        try {
            const res = await fetch(`/api/admin/update-user-role/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole }),
            });
            if (res.ok) {
                toast.success(`User role updated to ${newRole}`);
                fetchUsers();
            }
        } catch (err) {
            toast.error("Failed to update role");
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
                    Manage <span className="text-blue-600">Users</span>
                </h1>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2">Access Control & Member Directory</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">User Identity</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Role</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                                <User size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-zinc-900 dark:text-white uppercase text-sm">{user.name || 'Anonymous'}</span>
                                                <span className="text-[10px] font-bold text-zinc-400">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                                            user.role === 'admin' 
                                            ? 'bg-purple-50 text-purple-600 border-purple-100' 
                                            : 'bg-zinc-50 text-zinc-500 border-zinc-100'
                                        }`}>
                                            {user.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center justify-center gap-3">
                                            {user.role !== 'admin' ? (
                                                <button 
                                                    onClick={() => handleRoleUpdate(user._id, 'admin')}
                                                    className="cursor-pointer flex items-center gap-1 text-[10px] font-black uppercase bg-blue-600 text-white px-3 py-1.5 rounded-xl hover:bg-blue-700 transition-all"
                                                >
                                                    <ShieldCheck size={14} /> Make Admin
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => handleRoleUpdate(user._id, 'user')}
                                                    className="cursor-pointer flex items-center gap-1 text-[10px] font-black uppercase bg-zinc-200 text-zinc-600 px-3 py-1.5 rounded-xl hover:bg-zinc-300 transition-all"
                                                >
                                                    Demote
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;