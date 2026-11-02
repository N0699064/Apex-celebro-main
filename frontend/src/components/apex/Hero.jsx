import React, { useRef, useState } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Place the About video in /public under this name (MP4, 16:9). Until it exists the poster is shown.
const ABOUT_VIDEO = '/about-video.mp4';
const VIDEO_POSTER = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600';

const Hero = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section className="brand-gradient relative overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0 opacity-[0.10] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '44px 44px' }}></div>

      <div className="relative z-10 container mx-auto px-6 pt-36 pb-20 lg:pt-44 lg:pb-28 text-center">
        <h1 className="font-display font-bold text-white leading-[1.04] tracking-tight text-[2.6rem] sm:text-6xl lg:text-7xl max-w-4xl mx-auto animate-fade-up" data-testid="hero-headline">
          Let AI handle the busywork.
        </h1>
        <p className="text-lg lg:text-xl text-white/80 mt-6 leading-relaxed max-w-2xl mx-auto">
          Whether you work solo or run a large company, we set up simple AI tools and automations that take repetitive tasks off your plate.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          <button onClick={() => navigate('/contact')} className="group flex items-center gap-3 bg-white text-ink rounded-full pl-7 pr-2 py-2 font-bold text-[15px] shadow-[0_10px_34px_rgba(0,0,0,0.25)] hover:shadow-xl transition-all duration-300" data-testid="hero-book-btn">
            Book a Call
            <span className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5"><ArrowRight size={18} /></span>
          </button>
          <button onClick={() => navigate('/services')} className="rounded-full bg-white/12 backdrop-blur-md border border-white/35 text-white px-7 py-3.5 font-semibold text-[15px] hover:bg-white/22 transition-all duration-300">
            See our services
          </button>
        </div>

        {/* About video — plays automatically (muted, as browsers require) */}
        <div className="glossy-border relative rounded-[24px] max-w-4xl mx-auto mt-14 lg:mt-16 p-[3px]">
          <div className="relative rounded-[21px] overflow-hidden bg-ink aspect-video">
            <video
              ref={videoRef}
              src={ABOUT_VIDEO}
              poster={VIDEO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              aria-label="About APEX CEREBRO"
            />
            <button onClick={toggleSound} className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-ink/60 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-ink/80 transition-colors" aria-label={muted ? 'Turn sound on' : 'Turn sound off'}>
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
