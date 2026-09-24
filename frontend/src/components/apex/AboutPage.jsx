import React, { useEffect } from 'react';
import { Target, ShieldCheck, Gauge, Layers, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CTABand from './CTABand';

const values = [
  { icon: Target, title: 'Outcomes, not output', body: 'We measure success in hours saved and errors removed — not lines of code or slide decks.' },
  { icon: ShieldCheck, title: 'Fixed scope, fixed price', body: 'You know the number and the deliverable before we start. No creeping retainers, no surprise invoices.' },
  { icon: Gauge, title: 'Operator mindset', body: 'We build like the people who have to live with the system every day — because that’s who we are.' },
  { icon: Layers, title: 'Built to be owned', body: 'Every automation is documented and handed over, so your team stays in control long after launch.' },
];

const stats = [
  { k: '6', v: 'Automation disciplines' },
  { k: '3', v: 'Platforms we build in · Make, Zapier, n8n' },
  { k: '1 day', v: 'Typical response time' },
  { k: '100%', v: 'Fixed-scope pricing' },
];

const steps = [
  { n: '01', t: 'Map', d: 'We audit the workflow that’s costing you the most and pin down exactly what “done” looks like.' },
  { n: '02', t: 'Build', d: 'We wire the automation and AI logic, integrate your tools, and test it against real-world edge cases.' },
  { n: '03', t: 'Hand over', d: 'We deploy, train your team, and document everything — then it quietly runs in the background.' },
];

const AboutPage = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white">
      <Navbar />

      <section className="relative bg-ink overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute -top-40 right-1/4 w-[700px] h-[700px] rounded-full bg-brand-600/20 blur-[140px] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.10] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)', backgroundSize: '42px 42px' }}></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
            <span className="text-white/85 text-[11px] font-semibold tracking-[0.22em] uppercase">About Us</span>
          </div>
          <h1 className="font-display font-bold text-white text-4xl lg:text-6xl leading-tight max-w-4xl mx-auto">
            We turn manual bottlenecks into systems that run themselves.
          </h1>
          <p className="text-white/65 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            APEX CEREBRO is a boutique AI automation consultancy for growing companies that are tired of watching great teams drown in paperwork.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="relative rounded-[28px] overflow-hidden shadow-[0_30px_70px_rgba(10,21,51,0.18)] aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600" alt="The APEX CEREBRO team at work" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent"></div>
          </div>
          <div>
            <span className="text-brand-600 font-bold tracking-[0.18em] text-xs uppercase">Why we exist</span>
            <h2 className="font-display font-bold text-ink text-3xl lg:text-4xl mt-4 mb-6 leading-tight">Software should do the boring work.</h2>
            <div className="space-y-5 text-ink/70 text-lg leading-relaxed">
              <p>Every growing company hits the same wall: the tools multiply, the inbox fills up, and the paperwork never stops. Talented people end up copy-pasting between systems instead of doing the work they were hired for.</p>
              <p>We started APEX CEREBRO to fix exactly that. We build custom AI agents and automations that quietly absorb the repetitive work — reading documents, answering routine messages, syncing data, and routing what’s left to the right person.</p>
              <p>No theoretical blueprints. No jargon. Just systems that give your team their hours back.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-4">
        <div className="container mx-auto">
          <div className="gloss-top relative rounded-[32px] bg-ink overflow-hidden px-8 py-12 lg:px-14 lg:py-14">
            <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-600/20 blur-[120px] pointer-events-none"></div>
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display font-bold text-white text-4xl lg:text-5xl tracking-tight">{s.k}</div>
                  <div className="text-white/60 text-sm mt-2 leading-snug">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-brand-600 font-bold tracking-[0.18em] text-xs uppercase">What we believe</span>
            <h2 className="font-display font-bold text-ink text-4xl lg:text-5xl mt-4 leading-tight">The principles behind every build.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="rounded-[24px] border border-black/8 bg-white p-8 hover:border-brand-300 hover:shadow-[0_20px_50px_rgba(30,72,255,0.10)] transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6"><Icon size={26} strokeWidth={1.8} /></div>
                  <h3 className="font-display font-bold text-ink text-xl mb-3">{v.title}</h3>
                  <p className="text-ink/65 leading-relaxed">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-brand-600 font-bold tracking-[0.18em] text-xs uppercase">How we work</span>
            <h2 className="font-display font-bold text-ink text-4xl lg:text-5xl mt-4 leading-tight">Three steps. Fixed scope.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="rounded-[24px] border border-black/8 bg-[#FAFBFF] p-8">
                <div className="font-display font-bold text-brand-600 text-3xl mb-4">{s.n}</div>
                <h3 className="font-display font-bold text-ink text-xl mb-3">{s.t}</h3>
                <p className="text-ink/65 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/services')} className="mt-10 inline-flex items-center gap-2 text-ink font-bold hover:text-brand-600 transition-colors group">
            See what we build <ArrowRight size={18} className="text-brand-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <CTABand heading="Let's find the hours hiding in your operation." />
      <Footer />
    </div>
  );
};

export default AboutPage;
