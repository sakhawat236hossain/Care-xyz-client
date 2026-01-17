import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: "Premium Service Details | Care.xyz",
    description: "Experience the ultimate home care service.",
};

const ServiceDetails = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/services`, { cache: 'no-store' });
    const allServices = await res.json();
    const service = allServices.find(s => s._id === id);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Service Not Found</h2>
                    <p className="text-gray-500 dark:text-gray-400">The service you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-800 py-12 px-6 md:px-16 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
                        <span>/</span>
                        <span className="text-blue-600 font-medium">{service.category}</span>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full mb-4">
                                {service.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3">
                                {service.title}
                            </h1>
                        </div>
                        
                        <div className="text-right">
                            <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                                ${service.price_per_hour}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">per hour</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Left Column - Images */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Image */}
                        <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                            <img 
                                src={service.image} 
                                alt={service.title} 
                                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Secondary Images */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative overflow-hidden rounded-xl shadow-md h-64 group">
                                <img 
                                    src={service.image} 
                                    alt={`${service.title} view 2`}
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                                />
                            </div>
                            <div className="relative overflow-hidden rounded-xl shadow-md h-64 group">
                                <img 
                                    src={service.image} 
                                    alt={`${service.title} view 3`}
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                                />
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-8 mt-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service Overview</h2>
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 p-8">
                            <div className="space-y-6">
                                {/* Features */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">What's Included</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                            <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            <span className="text-gray-900 dark:text-white font-medium">Professional Verified</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-gray-900 dark:text-white font-medium">24/7 Support</span>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Always available</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing Summary */}
                                <div className="border-t border-gray-200 dark:border-zinc-700 pt-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Rate per hour</span>
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">${service.price_per_hour}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Final price may vary based on requirements</p>
                                </div>

                                {/* Booking Button */}
                                <Link href={`/booking/${service._id}`} className="block">
                                    <button className="cursor-pointer w-full py-4 bg-zinc-900 dark:bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 hover:shadow-xl active:scale-98 flex items-center justify-center gap-3 group">
                                        <span>Book This Service</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                        </svg>
                                    </button>
                                </Link>

                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                    Secure booking • Instant confirmation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;