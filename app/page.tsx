import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/landing/Hero';
// import StatsBand from '@/components/landing/StatsBand';
// import HowItWorks from '@/components/landing/HowItWorks';
// import Features from '@/components/landing/Features';
// import CtaSection from '@/components/landing/CtaSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <StatsBand />
      <HowItWorks />
      <Features />
      <CtaSection /> */}
      <Footer />
    </>
  );
}