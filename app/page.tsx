import CtaSection from '@/components/landing/CtaSection';
import Features from '@/components/landing/Features';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import StatsBand from '@/components/landing/StatsBand';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBand />
      <HowItWorks />
      <Features />
      <CtaSection />
      <Footer />
    </>
  );
}
