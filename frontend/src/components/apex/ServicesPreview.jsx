import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { services } from './ServicesData';
import ServiceCard from './ServiceCard';

const ServicesPreview = () => {
  const navigate = useNavigate();
  return (
    <section id="services" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-brand-600 font-bold tracking-[0.18em] text-xs uppercase">What we build</span>
          <h2 className="font-display font-bold text-ink text-4xl lg:text-5xl mt-4 leading-tight">
            Automation for every corner of your operation.
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.id} s={s} glow />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button onClick={() => navigate('/services')} className="group inline-flex items-center gap-2 bg-ink text-white rounded-full px-7 py-3.5 font-bold text-[15px] hover:bg-brand-600 transition-colors">
            View all services <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
