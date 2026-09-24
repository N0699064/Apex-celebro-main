import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTABand = ({ heading = 'Ready to hand the busywork to AI?', sub = 'Tell us about your biggest bottleneck. We review every request and reply within one business day — no obligation.' }) => {
  const navigate = useNavigate();
  return (
    <section className="bg-white px-4 sm:px-6 py-16 lg:py-24">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[32px] bg-ink px-8 py-14 lg:p-20 text-center">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-brand-600/20 blur-[130px] pointer-events-none"></div>
          <div className="absolute inset-0 opacity-[0.10] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          <div className="relative z-10">
            <h2 className="font-display font-bold text-white text-3xl lg:text-5xl leading-tight max-w-3xl mx-auto">{heading}</h2>
            <p className="text-white/65 text-lg mt-6 max-w-xl mx-auto leading-relaxed">{sub}</p>
            <button
              onClick={() => navigate('/contact')}
              className="group mt-10 inline-flex items-center gap-3 bg-brand-600 text-white rounded-full pl-8 pr-2 py-2 font-bold text-base glossy-border feature-card overflow-hidden hover:bg-brand-700 transition-all duration-300"
              data-testid="ctaband-book-btn"
            >
              Book a Call
              <span className="w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={19} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
