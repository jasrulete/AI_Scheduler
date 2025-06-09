import { Navbar } from "@/components/common/navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/common/footer";
import { Calendar } from "@/components/landing/Calendar";
import TestConnection from './test-connection'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-gold-400">
      <Navbar />
      <main className="flex-1 page-transition">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <TestConnection />
      </main>
      <Footer />
    </div>
  );
} 