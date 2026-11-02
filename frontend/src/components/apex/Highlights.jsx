import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    eyebrow: 'Less admin',
    title: 'Hand off the repetitive jobs.',
    sub: 'Emails, forms and data entry taken care of — so you can spend your time on the work you actually enjoy.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600',
  },
  {
    eyebrow: 'Connected tools',
    title: 'Your apps, working together.',
    sub: 'We link the apps you already use so information moves between them on its own — no more copy and paste.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1600',
  },
  {
    eyebrow: 'More time',
    title: 'Spend less time on admin.',
    sub: 'Fewer manual steps, fewer mistakes and quicker replies to your customers.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
  },
];

// Three-panel slideshow: the active panel expands on hover and the panels cycle on their own otherwise.
const Highlights = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setActive((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="bg-white px-4 sm:px-6 py-20 lg:py-28">
      <div className="container mx-auto">
        <div
          className="flex flex-col lg:flex-row gap-4 lg:h-[520px]"
          onMouseLeave={() => setPaused(false)}
        >
          {slides.map((s, idx) => {
            const on = idx === active;
            return (
              <div
                key={s.title}
                onMouseEnter={() => { setActive(idx); setPaused(true); }}
                onClick={() => setActive(idx)}
                className={`group relative overflow-hidden rounded-[28px] cursor-pointer h-[360px] lg:h-auto transition-[flex-grow] duration-700 ease-out ${on ? 'lg:flex-[3]' : 'lg:flex-[1]'}`}
              >
                <img src={s.image} alt="" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${on ? 'scale-100' : 'scale-110'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/20"></div>

                <div className="relative z-10 h-full flex flex-col justify-end p-7 lg:p-9">
                  <span className="text-brand-200 font-bold tracking-[0.18em] text-xs uppercase">{s.eyebrow}</span>
                  <h2 className="font-display font-bold text-white text-2xl lg:text-3xl mt-2 leading-tight">{s.title}</h2>
                  <div className={`grid transition-all duration-500 ${on ? 'lg:grid-rows-[1fr] lg:opacity-100' : 'lg:grid-rows-[0fr] lg:opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="text-white/80 mt-3 leading-relaxed max-w-md">{s.sub}</p>
                      <button onClick={() => navigate('/services')} className="mt-5 inline-flex items-center gap-2 text-white font-bold text-sm hover:text-brand-200 transition-colors">
                        See how it works <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
