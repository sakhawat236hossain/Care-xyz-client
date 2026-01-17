import ServiceCard from "@/components/ServiceCard/ServiceCard";

export const metadata = {
  title: "Services | Care.xyz",
  description: "Find the best baby care and elderly services near you.",
};


export default async function servicesPage() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/services`, { cache: 'no-store' });
  const services = await res.json();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </main>
  );
}