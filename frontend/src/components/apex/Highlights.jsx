import React, { useEffect, useState } from 'react';
import { ArrowRight, Inbox, Cable, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    icon: Inbox,
    eyebrow: 'Less admin',
    title: 'Hand off the repetitive jobs.',
    sub: 'Emails, forms and data entry taken care of, so you can spend your time on the work you actually enjoy.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1600',
  },
  {
    icon: Cable,
    eyebrow: 'Connected tools',
    title: 'Your apps, working together.',
    sub: 'We link the apps you already use so information moves between them on its own. No more copy and paste.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1600',
  },
  {
    icon: Clock,
    eyebrow: 'More time',
    title: 'Spend less time on admin.',
    sub: 'Fewer manual steps, fewer mistakes and quicker replies to your customers.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600',
  },
];

// Three-panel slideshow: the active panel expands on hover and the panels cycle on their own otherwise.
// Collapsed panels show just the photo and an icon, like a filmstrip.
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
        <h2 className="font-display font-bold text-ink text-3xl lg:text-5xl leading-tight text-center max-w-3xl mx-auto mb-12">
          AI automation for businesses of every size.
        </h2>

        <div
          className="flex flex-col lg:flex-row gap-3 lg:h-[480px]"
          onMouseLeave={() => setPaused(false)}
        >
          {slides.map((s, idx) => {
            const on = idx === active;
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                onMouseEnter={() => { setActive(idx); setPaused(true); }}
                onClick={() => setActive(idx)}
                className={`relative overflow-hidden rounded-[24px] cursor-pointer h-[380px] lg:h-auto transition-[flex-grow] duration-700 ease-out ${on ? 'lg:flex-[4]' : 'lg:flex-[1]'}`}
              >
                <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className={`absolute inset-0 transition-colors duration-500 ${on ? 'bg-gradient-to-t from-ink/90 via-ink/40 to-ink/30' : 'bg-ink/45'}`}></div>

                {/* Collapsed: centred icon only (desktop) */}
                <div className={`hidden lg:flex absolute inset-0 items-center justify-center text-white transition-opacity duration-300 ${on ? 'opacity-0' : 'opacity-100'}`}>
                  <Icon size={30} strokeWidth={2} />
                </div>

                {/* Expanded: icon + title at the top, description at the bottom */}
                <div className={`relative z-10 h-full flex flex-col justify-between p-7 lg:p-9 transition-opacity duration-500 ${on ? 'lg:opacity-100 lg:delay-200' : 'lg:opacity-0 lg:pointer-events-none'}`}>
                  <div>
                    <Icon size={30} strokeWidth={2} className="text-white" />
                    <span className="block text-brand-200 font-bold tracking-[0.18em] text-xs uppercase mt-6">{s.eyebrow}</span>
                    <h3 className="font-display font-bold text-white text-2xl lg:text-4xl mt-2 leading-tight lg:whitespace-nowrap">{s.title}</h3>
                  </div>
                  <div className="max-w-lg">
                    <p className="text-white/85 leading-relaxed">{s.sub}</p>
                    <button onClick={() => navigate('/services')} className="mt-4 inline-flex items-center gap-2 text-white font-bold text-sm hover:text-brand-200 transition-colors">
                      See how it works <ArrowRight size={16} />
                    </button>
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
