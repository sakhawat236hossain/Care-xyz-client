import Hero from "@/components/HomePage/Hero/Hero";
import StatsSection from "@/components/HomePage/StatsSection/StatsSection";
import ServicesSection from "@/components/HomePage/ServicesSection/ServicesSection";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import FeaturedCaregivers from "@/components/HomePage/FeaturedCaregivers/FeaturedCaregivers";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
import CallToAction from "@/components/HomePage/CallToAction/CallToAction";
import FAQ from "@/components/HomePage/FAQ/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black font-sans transition-colors duration-500">
      <Hero />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUs />
      <HowItWorks></HowItWorks>
      <FeaturedCaregivers></FeaturedCaregivers>
      <Testimonials></Testimonials>
      <CallToAction></CallToAction>
      <FAQ></FAQ>
    </main>
  );
}