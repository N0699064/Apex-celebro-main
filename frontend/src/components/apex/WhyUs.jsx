import React from 'react';
import { Crosshair, Gauge } from 'lucide-react';

const points = [
  {
    icon: Crosshair,
    title: 'Zero Fluff, Pure Execution',
    body: "We don't sell generic software advice or theoretical blueprints. We focus strictly on the uncompromising quality of the systems we build — and the bottom-line value they bring to your workplace capacity.",
  },
  {
    icon: Gauge,
    title: 'Outcomes Over Code',
    body: 'We keep the technical complexity under the hood. You don\u2019t need to understand the underlying framework — you just need to see the hours, manual errors, and response times drop drastically.',
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
            Built by operators, not vendors.
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
