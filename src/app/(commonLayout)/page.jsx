import Hero from "@/components/HomePage/Hero/Hero";
import StatsSection from "@/components/HomePage/StatsSection/StatsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black font-sans transition-colors duration-500">
      <Hero />
      <StatsSection />
    </main>
  );
}