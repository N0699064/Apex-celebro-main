import React from 'react';
import { Play } from 'lucide-react';

// Compact, centered video card (dummy thumbnail) with the glossy colour outline
const VIDEO_THUMB = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600';

const IntroCard = () => {
  return (
    <section className="bg-[#F4F6FB] px-4 sm:px-6 py-14 lg:py-20">
      <div className="container mx-auto">
        <div className="text-center mb-7">
          <span className="text-brand-600 font-bold tracking-[0.18em] text-xs uppercase">See it in action</span>
          <h2 className="font-display font-bold text-ink text-2xl lg:text-3xl mt-3">Watch how APEX CEREBRO works.</h2>
        </div>

        <div className="glossy-border relative rounded-[24px] max-w-2xl mx-auto p-[3px]">
          <div className="group relative rounded-[21px] overflow-hidden bg-ink aspect-video cursor-pointer">
            <img src={VIDEO_THUMB} alt="Product overview video" className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-[72px] h-[72px] rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                <Play size={30} className="text-ink ml-1" fill="currentColor" />
              </span>
            </div>
            <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white/90">
              <span className="w-2 h-2 rounded-full bg-brand-400"></span>
              <span className="text-sm font-semibold">2-min overview</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroCard;
