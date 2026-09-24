import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import HeroSlider from './HeroSlider';
import IntroCard from './IntroCard';
import Problem from './Problem';
import ServicesPreview from './ServicesPreview';
import WhyUs from './WhyUs';
import Pricing from './Pricing';
import CTABand from './CTABand';
import Footer from './Footer';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  }, [location]);

  return (
    <div className="bg-white">
      <Navbar />
      <HeroSlider />
      <IntroCard />
      <Problem />
      <ServicesPreview />
      <WhyUs />
      <Pricing />
      <CTABand />
      <Footer />
    </div>
  );
};

export default Home;
