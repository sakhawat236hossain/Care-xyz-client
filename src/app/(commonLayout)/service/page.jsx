import ServiceCard from "@/components/ServiceCard/ServiceCard";

export const metadata = {
  title: "Services | Care.xyz",
  description: "Find the best baby care and elderly services near you.",
};

export default async function ServicePage() {
  let services = [];
  
  try {
    // ১. লাইভ এবং লোকাল উভয় জায়গার জন্য বেজ ইউআরএল সেট করা
    // আপনার লাইভ ইউআরএল ডাইনামিকভাবে নেওয়ার চেষ্টা করবে
    const baseUrl = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/services`, { 
      cache: 'no-store',
      // অনেক সময় লাইভ সার্ভারে SSL সার্টিফিকেটের কারণে ফেচ আটকে যায়, তাই নিচের হেডারটি সেফটি হিসেবে কাজ করে
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    services = Array.isArray(data) ? data : (data.services || []);
    
  } catch (error) {
    console.error("Error fetching services:", error);
    services = []; 
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4">
            Reliable Care Services
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Choose from our premium services tailored for your family's health and happiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services && services.length > 0 ? (
            services.map((service) => (
              <ServiceCard key={service._id?.toString() || Math.random()} service={service} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
              <p className="text-zinc-400 font-medium">No services available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}