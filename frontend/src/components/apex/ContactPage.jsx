import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Clock, ShieldCheck, Sparkles, Video, ArrowRight, CalendarClock } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import IntakeForm from './IntakeForm';

const bookingOptions = [
  {
    icon: Video,
    duration: '45-Minute Consultation',
    price: '£120',
    tag: 'Focused deep-dive',
    desc: 'A senior automation engineer digs into one core bottleneck and shows you exactly where the quick wins are.',
    features: ['One bottleneck, fully unpacked', 'Live screen-share walkthrough', 'Action summary sent after the call'],
  },
  {
    icon: CalendarClock,
    duration: '90-Minute Strategy Session',
    price: '£250',
    tag: 'Full operation audit',
    highlight: true,
    desc: 'A complete review of your operation and a prioritised automation roadmap you can start acting on immediately.',
    features: ['End-to-end operation review', 'Prioritised automation roadmap', 'Rough investment & ROI estimate'],
  },
];

const ContactPage = () => {
  const location = useLocation();
  const initialPackage = location.state?.package || '';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const scrollToForm = () => {
    document.getElementById('intake-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-white">
      <Navbar />

      <section className="relative bg-ink overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute -top-40 right-1/4 w-[700px] h-[700px] rounded-full bg-brand-600/20 blur-[140px] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.10] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)', backgroundSize: '42px 42px' }}></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
            <span className="text-white/85 text-[11px] font-semibold tracking-[0.22em] uppercase">Book Your Consultation</span>
          </div>
          <h1 className="font-display font-bold text-white text-4xl lg:text-6xl leading-tight max-w-3xl mx-auto">Tell us about your bottleneck.</h1>
          <p className="text-white/65 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Book a paid call to get straight to a plan, or send us the details below and we&rsquo;ll come back to you within one business day.
          </p>
        </div>
      </section>

      {/* Paid booking options */}
      <section className="bg-[#F4F6FB] pt-16 lg:pt-24 -mt-10 lg:-mt-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-brand-600 font-bold tracking-[0.18em] text-xs uppercase">Book a call directly</span>
            <h2 className="font-display font-bold text-ink text-3xl lg:text-4xl mt-3 leading-tight">Pick a paid session</h2>
            <p className="text-ink/60 mt-3 leading-relaxed">Prefer to jump straight on a call? Choose the session that fits — no forms, no waiting.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {bookingOptions.map((b) => {
              const I = b.icon;
              return (
                <div
                  key={b.duration}
                  className={`relative flex flex-col rounded-[24px] bg-white p-7 lg:p-8 ${b.highlight ? 'glossy-border feature-card shadow-[0_24px_60px_rgba(30,72,255,0.14)]' : 'border border-black/8 shadow-[0_20px_50px_rgba(5,10,30,0.06)]'}`}
                  data-testid={`booking-option-${b.price.replace(/[^0-9]/g, '')}`}
                >
                  {b.highlight && (
                    <span className="absolute -top-3 left-8 bg-gradient-to-r from-brand-500 to-brand-700 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">Most booked</span>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0"><I size={22} /></span>
                    <div className="text-right">
                      <div className="font-display font-bold text-ink text-3xl tracking-tight">{b.price}</div>
                      <span className="text-ink/45 text-xs font-semibold uppercase tracking-wider">{b.tag}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-ink text-xl mt-5 leading-tight">{b.duration}</h3>
                  <p className="text-ink/60 text-[15px] leading-relaxed mt-2">{b.desc}</p>
                  <ul className="mt-5 space-y-2.5 flex-grow">
                    {b.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[14px] text-ink/75">
                        <ShieldCheck size={16} className="text-brand-600 mt-0.5 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={scrollToForm}
                    className={`mt-7 w-full flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-[15px] group transition-all duration-300 ${b.highlight ? 'bg-brand-600 hover:bg-brand-700 text-white' : 'border border-brand-600/50 text-brand-600 hover:bg-brand-600 hover:text-white'}`}
                    data-testid={`booking-cta-${b.price.replace(/[^0-9]/g, '')}`}
                  >
                    Book this session
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="intake-form-section" className="scroll-mt-24 bg-[#F4F6FB] py-16 lg:py-24 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-10 px-6">
          <span className="text-brand-600 font-bold tracking-[0.18em] text-xs uppercase">Or send the details</span>
          <h2 className="font-display font-bold text-ink text-3xl lg:text-4xl mt-3 leading-tight">Not ready to book? Tell us more.</h2>
        </div>
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[28px] border border-black/8 p-8 shadow-[0_20px_50px_rgba(5,10,30,0.06)] sticky top-28">
              <h3 className="font-display font-bold text-ink text-xl mb-6">What happens next</h3>
              <ul className="space-y-5">
                {[
                  { icon: ShieldCheck, t: 'We review your profile', d: 'A senior engineer checks your bottleneck against what we can automate.' },
                  { icon: Sparkles, t: 'You get a tailored outline', d: 'We email a scoped approach and rough investment — usually within a day.' },
                  { icon: Clock, t: 'You decide', d: 'Move forward on a fixed scope, or not. No pressure, no obligation.' },
                ].map((x, i) => {
                  const I = x.icon;
                  return (
                    <li key={i} className="flex items-start gap-3.5">
                      <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0"><I size={19} /></span>
                      <div>
                        <p className="font-bold text-ink text-[15px]">{x.t}</p>
                        <p className="text-ink/60 text-sm leading-relaxed mt-0.5">{x.d}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 pt-6 border-t border-black/8">
                <a href="mailto:hello@apexcerebro.com" className="flex items-center gap-2.5 text-ink hover:text-brand-600 transition-colors font-medium">
                  <Mail size={18} className="text-brand-600" /> hello@apexcerebro.com
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <IntakeForm initialPackage={initialPackage} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
