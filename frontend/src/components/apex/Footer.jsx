import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowUpRight } from 'lucide-react';
import { services } from './ServicesData';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goPricing = () => {
    if (location.pathname === '/') {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 350);
    }
  };

  return (
    <footer className="bg-ink text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <img src="/apex-mark-white.png" alt="APEX CEREBRO" className="h-6 w-auto" />
              <span className="font-display font-bold text-lg tracking-tight">APEX <span className="font-medium opacity-80">CEREBRO</span></span>
            </div>
            <p className="text-white/55 max-w-sm leading-relaxed">
              Custom AI agents and automations that clear document, communication, and data-entry backlogs — so your team ships work, not busywork.
            </p>
            <button onClick={() => navigate('/contact')} className="mt-7 inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white rounded-full px-6 py-3 font-bold text-sm transition-colors">
              Book a Call <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="lg:col-span-4 lg:col-start-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-5">Services</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-white/70">
              {services.map((s) => (
                <li key={s.id}><button onClick={() => navigate(`/services/${s.id}`)} className="hover:text-brand-300 transition-colors text-left">{s.title}</button></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-5">Company</h4>
            <ul className="space-y-3 text-white/70">
              <li><button onClick={() => navigate('/services')} className="hover:text-brand-300 transition-colors">All Services</button></li>
              <li><button onClick={() => navigate('/about')} className="hover:text-brand-300 transition-colors">About Us</button></li>
              <li><button onClick={() => navigate('/faq')} className="hover:text-brand-300 transition-colors">FAQ</button></li>
              <li><button onClick={goPricing} className="hover:text-brand-300 transition-colors">Pricing</button></li>
              <li><button onClick={() => navigate('/contact')} className="hover:text-brand-300 transition-colors">Contact</button></li>
              <li><a href="mailto:hello@apexcerebro.com" className="flex items-center gap-2 hover:text-brand-300 transition-colors"><Mail size={15} /> hello@apexcerebro.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40 gap-3">
          <p>&copy; {new Date().getFullYear()} APEX CEREBRO. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
