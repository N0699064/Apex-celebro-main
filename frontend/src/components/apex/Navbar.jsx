import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Info, HelpCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { services } from './ServicesData';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobServices, setMobServices] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : 'unset'; }, [open]);

  const goPricing = () => {
    if (location.pathname === '/') document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    else { navigate('/'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 350); }
  };

  const pill = scrolled
    ? 'bg-white/85 backdrop-blur-xl shadow-[0_12px_40px_rgba(10,21,51,0.14)] border border-black/5'
    : 'bg-transparent border border-transparent';
  const text = scrolled ? 'text-ink' : 'text-white';
  const cta = scrolled ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-white text-ink hover:bg-brand-600 hover:text-white';

  return (
    <nav className="fixed top-0 left-0 w-full z-[100]">
      <div className="container mx-auto px-4 lg:px-6 pt-4">
        <div className={`relative flex items-center justify-between rounded-full pl-5 pr-3 lg:pl-7 py-2.5 transition-all duration-300 ${pill} ${text}`}>
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5 select-none z-[110]" data-testid="brand-logo">
            <img src={scrolled ? '/apex-mark-dark.png' : '/apex-mark-white.png'} alt="APEX CEREBRO" className="h-[22px] w-auto" />
            <span className="font-display font-bold text-[17px] tracking-tight leading-none">APEX <span className="font-medium opacity-80">CEREBRO</span></span>
          </button>

          {/* Center links */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 font-medium text-[15px]">
            {/* Services dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1.5 py-2 transition-colors hover:text-brand-600">
                Services <ChevronDown size={15} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                <div className="glossy-border w-[560px] max-w-[92vw] rounded-[22px] bg-white shadow-[0_30px_70px_rgba(10,21,51,0.22)] p-3">
                  <div className="grid grid-cols-2 gap-1">
                    {services.map((s) => {
                      const Icon = s.icon;
                      return (
                        <button key={s.id} onClick={() => navigate(`/services/${s.id}`)} className="flex items-start gap-3 p-3 rounded-xl text-left hover:bg-brand-50 transition-colors">
                          <span className={`w-10 h-10 rounded-xl ${s.tile} flex items-center justify-center flex-shrink-0`}><Icon size={19} strokeWidth={1.9} /></span>
                          <span>
                            <span className="block font-bold text-ink text-[14px] leading-tight">{s.title}</span>
                            <span className="block text-ink/55 text-[12px] leading-snug mt-0.5 line-clamp-2">{s.description}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => navigate('/services')} className="mt-2 w-full flex items-center justify-between px-4 py-3 rounded-xl bg-ink text-white hover:bg-brand-600 transition-colors">
                    <span className="font-bold text-sm">View all services</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Company dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1.5 py-2 transition-colors hover:text-brand-600">
                Company <ChevronDown size={15} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                <div className="glossy-border w-[300px] rounded-[22px] bg-white shadow-[0_30px_70px_rgba(10,21,51,0.22)] p-3">
                  <button onClick={() => navigate('/about')} className="w-full flex items-start gap-3 p-3 rounded-xl text-left hover:bg-brand-50 transition-colors">
                    <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0"><Info size={19} /></span>
                    <span>
                      <span className="block font-bold text-ink text-[14px]">About Us</span>
                      <span className="block text-ink/55 text-[12px] mt-0.5">Who we are and how we work.</span>
                    </span>
                  </button>
                  <button onClick={() => navigate('/faq')} className="w-full flex items-start gap-3 p-3 rounded-xl text-left hover:bg-brand-50 transition-colors">
                    <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0"><HelpCircle size={19} /></span>
                    <span>
                      <span className="block font-bold text-ink text-[14px]">FAQ</span>
                      <span className="block text-ink/55 text-[12px] mt-0.5">Answers to common questions.</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <button onClick={goPricing} className="transition-colors hover:text-brand-600">Pricing</button>
            <button onClick={() => navigate('/contact')} className="transition-colors hover:text-brand-600">Contact</button>
          </div>

          <div className="hidden lg:flex items-center">
            <button onClick={() => navigate('/contact')} className={`px-6 py-2.5 rounded-full font-bold text-[14px] flex items-center gap-2 group transition-all duration-300 ${cta} ${scrolled ? 'glossy-border feature-card overflow-hidden' : ''}`} data-testid="nav-book-btn">
              Book a Call
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 duration-300" />
            </button>
          </div>

          <button className={`lg:hidden z-[110] p-1 ${scrolled ? 'text-ink' : 'text-white'}`} onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 bg-ink z-[105] transition-transform duration-500 ease-in-out lg:hidden pt-28 px-8 overflow-y-auto ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col pb-24">
          <div className="border-b border-white/10">
            <button onClick={() => setMobServices(!mobServices)} className="w-full flex justify-between items-center py-6 text-2xl font-display font-semibold text-white">
              Services <ChevronDown size={24} className={`text-brand-400 transition-transform ${mobServices ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${mobServices ? 'max-h-[520px] mb-4' : 'max-h-0'}`}>
              <div className="space-y-1 bg-white/[0.04] rounded-2xl p-2">
                {services.map((s) => (
                  <button key={s.id} onClick={() => { setOpen(false); setTimeout(() => navigate(`/services/${s.id}`), 60); }} className="w-full text-left px-5 py-3.5 text-white/75 hover:text-white rounded-xl hover:bg-white/5 transition-colors">{s.title}</button>
                ))}
              </div>
            </div>
          </div>
          {[{ l: 'About Us', f: () => navigate('/about') }, { l: 'FAQ', f: () => navigate('/faq') }, { l: 'Pricing', f: goPricing }, { l: 'Contact', f: () => navigate('/contact') }].map((x) => (
            <button key={x.l} onClick={() => { setOpen(false); setTimeout(x.f, 60); }} className="w-full text-left py-6 text-2xl font-display font-semibold text-white border-b border-white/10 hover:text-brand-400 transition-colors">{x.l}</button>
          ))}
          <button onClick={() => { setOpen(false); setTimeout(() => navigate('/contact'), 60); }} className="mt-10 w-full bg-brand-600 text-white py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform">
            Book a Call <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
