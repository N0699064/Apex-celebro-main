import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import Highlights from './Highlights';
import Problem from './Problem';
import ServicesPreview from './ServicesPreview';
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
      <Hero />
      <Highlights />
      <Problem />
      <ServicesPreview />
      <Pricing />
      <CTABand />
      <Footer />
    </div>
  );
};

export default Home;
