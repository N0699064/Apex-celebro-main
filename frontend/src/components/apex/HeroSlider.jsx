import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    eyebrow: 'AI Workflow Automation',
    title: 'Automation that runs itself.',
    sub: 'Custom AI agents that clear your busywork — so your team can focus on growth.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2200',
  },
  {
    eyebrow: 'Connected Systems',
    title: 'Your tools, connected.',
    sub: 'We link your apps so data moves on its own — no more copy and paste.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2200',
  },
  {
    eyebrow: 'Real Results',
    title: 'Save hours every week.',
    sub: 'Less admin, fewer errors and faster replies — so your team gets time back.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2200',
  },
];

const HeroSlider = () => {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const n = slides.length;
  const next = useCallback(() => setI((p) => (p + 1) % n), [n]);
  const prev = () => setI((p) => (p - 1 + n) % n);

  useEffect(() => {
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="bg-white p-3 sm:p-4 lg:p-6" data-testid="hero-section">
      <div className="relative overflow-hidden rounded-[26px] sm:rounded-[36px] lg:rounded-[44px] bg-ink min-h-[120vh]">
        {slides.map((s, idx) => (
          <div key={idx} className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[900ms] ${idx === i ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
            {/* Balanced legibility wash — lets the picture show while keeping text crisp */}
            <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/35 to-ink/85"></div>
            <div className="absolute inset-0 bg-brand/25"></div>
            <div className="absolute inset-0 opacity-[0.10]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '44px 44px' }}></div>

            <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto pt-48 pb-24 ${idx === i ? 'animate-fade-up' : ''}`}>
              <h1 className="font-display font-bold text-white leading-[1.02] tracking-tight text-[2.9rem] sm:text-6xl lg:text-7xl xl:text-[5.2rem] [text-shadow:_0_2px_28px_rgba(0,0,0,0.4)]" data-testid="hero-headline">
                {s.title}
              </h1>
              <p className="text-lg lg:text-xl text-white/85 mt-6 mb-10 leading-relaxed max-w-xl mx-auto [text-shadow:_0_1px_16px_rgba(0,0,0,0.35)]">{s.sub}</p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => navigate('/contact')} className="group flex items-center gap-3 bg-white text-ink rounded-full pl-7 pr-2 py-2 font-bold text-[15px] shadow-[0_10px_34px_rgba(0,0,0,0.25)] hover:shadow-xl transition-all duration-300" data-testid="hero-book-btn">
                  Book a Call
                  <span className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5"><ArrowRight size={18} /></span>
                </button>
                <button onClick={() => navigate('/services')} className="group flex items-center gap-3 rounded-full bg-white/12 backdrop-blur-md border border-white/35 text-white pl-7 pr-2 py-2 font-semibold text-[15px] hover:bg-white/22 transition-all duration-300">
                  See our Services
                  <span className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5"><ArrowRight size={18} /></span>
                </button>
                <button onClick={() => navigate('/about')} className="flex items-center gap-2.5 rounded-full bg-white/12 backdrop-blur-md border border-white/35 text-white px-6 py-3.5 font-semibold text-[15px] hover:bg-white/22 transition-all duration-300">
                  <Users size={18} /> About us
                </button>
              </div>
            </div>
          </div>
        ))}

        <button onClick={prev} className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Previous"><ChevronLeft size={22} /></button>
        <button onClick={next} className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Next"><ChevronRight size={22} /></button>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-2 rounded-full transition-all duration-300 ${idx === i ? 'w-8 bg-brand-400' : 'w-2 bg-white/40 hover:bg-white/70'}`} aria-label={`Slide ${idx + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
