import React, { useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CTABand from './CTABand';
import { services, getService } from './ServicesData';

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const s = getService(id);
  const Icon = s.icon;
  const others = services.filter((x) => x.id !== s.id).slice(0, 3);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  return (
    <div className="bg-white">
      <Navbar />

      {/* Banner */}
      <section className="relative bg-ink overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="absolute -top-40 right-1/4 w-[700px] h-[700px] rounded-full bg-brand-600/20 blur-[140px] pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <button onClick={() => navigate('/services')} className="inline-flex items-center gap-2 text-white/60 hover:text-brand-300 transition-colors text-sm font-medium mb-8">
            <ArrowLeft size={16} /> All services
          </button>
          <div className="flex items-start gap-5 max-w-3xl">
            <div className={`w-16 h-16 rounded-2xl ${s.tile} flex items-center justify-center flex-shrink-0 shadow-lg`}>
              <Icon size={30} strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-4xl lg:text-6xl leading-tight">{s.title}</h1>
              <p className="text-white/70 text-lg mt-5 leading-relaxed">{s.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="rounded-[28px] overflow-hidden shadow-[0_30px_70px_rgba(5,10,30,0.15)] aspect-[4/3]">
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-display font-bold text-ink text-3xl lg:text-4xl mb-6 leading-tight">How it works</h2>
            <p className="text-ink/70 text-lg leading-relaxed mb-8">{s.intro}</p>
            <ul className="space-y-4">
              {s.points.map((p, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <span className="mt-0.5 w-7 h-7 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  <span className="text-ink/80 leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-brand-50 border-l-4 border-brand-600 p-5">
              <p className="text-ink font-semibold">{s.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <h3 className="font-display font-bold text-ink text-2xl mb-8">Explore other services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((o) => {
              const OIcon = o.icon;
              return (
                <button key={o.id} onClick={() => navigate(`/services/${o.id}`)} className="group text-left bg-white rounded-[22px] border border-black/8 p-7 hover:border-brand-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(30,72,255,0.10)] transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl ${o.tile} flex items-center justify-center mb-5`}>
                    <OIcon size={22} strokeWidth={1.8} />
                  </div>
                  <h4 className="font-display font-bold text-ink text-lg mb-2 group-hover:text-brand-600 transition-colors">{o.title}</h4>
                  <span className="inline-flex items-center gap-1.5 text-brand-600 font-bold text-sm">Learn more <ArrowRight size={14} /></span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand heading={`Automate your ${s.title.toLowerCase()}.`} />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
