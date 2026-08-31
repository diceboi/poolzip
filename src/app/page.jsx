import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import FeaturesGrid from '@/components/FeaturesGrid';
import Comparison from '@/components/Comparison';
import VideoSection from '@/components/VideoSection';
import GallerySection from '@/components/GallerySection';
import ScrollZipper from '@/components/ScrollZipper';
import Calculator from '@/components/Calculator';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white overflow-hidden">
      {/* 1. Sticky Header Navigation */}
      <Header />

      {/* 2. Hero Section with Fluid Typography, Badges and Wave Mask */}
      <Hero />

      {/* 3. About — Poolzip intro with tilted photos */}
      <AboutSection />

      {/* 4. Key Technological Pillars */}
      <FeaturesGrid />

      {/* 4. Comparison Section: Policarbonate vs Roller vs Poolzip */}
      <Comparison />

      {/* 5. Video Showcase Player & Presentation */}
      <VideoSection />

      {/* 6. Gallery / Swiper Slider with Reference Projects */}
      <GallerySection />

      {/* Dynamic Scroll Zipper Transition: Unzips from left to right as you scroll into the 3D Section */}
      <ScrollZipper />

      {/* 7. The Core Feature: Interactive 3D Pool Configurator & Lead Generation Form */}
      <Calculator />

      {/* 8. Verified Homeowner Reviews */}
      <Testimonials />

      {/* 9. Frequently Asked Questions */}
      <FAQ />

      {/* 10. Footer with Contact & Impressum */}
      <Footer />
    </main>
  );
}
