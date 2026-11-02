import React from 'react';
import { Crosshair, Gauge } from 'lucide-react';

const points = [
  {
    icon: Crosshair,
    title: 'No fluff, just results',
    body: "We don't sell generic advice or complicated plans. We focus on building things that work well and save you real time.",
  },
  {
    icon: Gauge,
    title: 'We handle the technical side',
    body: 'You don’t need to understand how any of it works. You just get less admin, fewer mistakes and quicker replies to your customers.',
  },
];

const WhyUs = () => {
  return (
    <section id="why" className="scroll-mt-24 bg-ink text-white py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-600/15 blur-[130px] pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-16">
          <span className="text-brand-400 font-bold tracking-[0.18em] text-xs uppercase">Why work with us</span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl mt-4 leading-tight">
            Built by people who do the work.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="rounded-[28px] bg-white/[0.04] border border-white/10 p-8 lg:p-10 hover:border-brand-500/40 transition-colors duration-300">
                <div className="w-14 h-14 rounded-2xl bg-brand-600/15 border border-brand-500/25 flex items-center justify-center text-brand-400 mb-7">
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">{p.title}</h3>
                <p className="text-white/65 text-lg leading-relaxed">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
