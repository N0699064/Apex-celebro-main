import React, { useEffect } from 'react';
import { Target, ShieldCheck, Gauge, Layers, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CTABand from './CTABand';
import WhyUs from './WhyUs';

const values = [
  { icon: Target, title: 'Results, not jargon', body: 'We measure success in hours saved and mistakes avoided — not in technical features.' },
  { icon: ShieldCheck, title: 'Fixed scope, fixed price', body: 'You know the price and exactly what you’ll get before we start. No surprise invoices.' },
  { icon: Gauge, title: 'Simple to use', body: 'We build things that are easy to use day to day — whether it’s just you or a whole department using them.' },
  { icon: Layers, title: 'Yours to keep', body: 'Everything we build is explained and handed over, so you stay in control long after launch.' },
];

const stats = [
  { k: '6', v: 'Core services' },
  { k: '3', v: 'Platforms we build in · Make, Zapier, n8n' },
  { k: '1 day', v: 'Typical response time' },
  { k: '100%', v: 'Fixed-scope pricing' },
];

const steps = [
  { n: '01', t: 'Map', d: 'We look at the tasks taking up most of your time and agree exactly what the finished result should do.' },
  { n: '02', t: 'Build', d: 'We set up the automation, connect it to the tools you already use and test it thoroughly.' },
  { n: '03', t: 'Hand over', d: 'We switch it on, show you how it works and give you simple instructions to keep — then it runs in the background.' },
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
            We turn repetitive tasks into systems that run themselves.
          </h1>
          <p className="text-white/65 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            APEX CEREBRO is an AI automation consultancy for freelancers, small businesses and large companies alike — anyone tired of losing hours to admin and paperwork.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="relative rounded-[28px] overflow-hidden shadow-[0_30px_70px_rgba(2,16,72,0.18)] aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600" alt="The APEX CEREBRO team at work" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent"></div>
          </div>
          <div>
            <span className="text-brand-600 font-bold tracking-[0.18em] text-xs uppercase">Why we exist</span>
            <h2 className="font-display font-bold text-ink text-3xl lg:text-4xl mt-4 mb-6 leading-tight">Software should do the boring work.</h2>
            <div className="space-y-5 text-ink/70 text-lg leading-relaxed">
              <p>Whether you work on your own or run a large company, the same thing happens: the apps multiply, the inbox fills up and the paperwork never stops. Hours that should go on your real work get spent copying information from one place to another.</p>
              <p>We started APEX CEREBRO to fix exactly that. We set up AI tools and automations that take on the repetitive jobs — reading documents, answering routine messages and keeping your apps up to date — and pass anything that needs a human straight to you.</p>
              <p>No jargon. Just simple systems that give you your time back.</p>
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
          <div className="mb-14">
            <span className="text-brand-600 font-bold tracking-[0.18em] text-xs uppercase">What we believe</span>
            <h2 className="font-display font-bold text-ink text-3xl sm:text-4xl lg:text-5xl mt-4 leading-tight lg:whitespace-nowrap">The principles behind every build.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="rounded-[24px] border border-black/8 bg-white p-8 hover:border-brand-300 hover:shadow-[0_20px_50px_rgba(0,0,255,0.10)] transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6"><Icon size={26} strokeWidth={1.8} /></div>
                  <h3 className="font-display font-bold text-ink text-xl mb-3">{v.title}</h3>
                  <p className="text-ink/65 leading-relaxed">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WhyUs />

      <section className="pt-20 lg:pt-28">
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

      <CTABand heading="Let's find the hours hiding in your week." />
      <Footer />
    </div>
  );
};

export default AboutPage;
