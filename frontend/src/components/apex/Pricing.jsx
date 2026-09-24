import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Simple Automation', price: '$4,500', cadence: 'one-time project', highlight: false,
    tagline: 'Automate one core workflow end-to-end.',
    features: ['Single workflow automation (Make / Zapier / n8n)', 'Up to 3 app integrations', 'Full documentation', '2 weeks of support', 'Video handover walkthrough'],
  },
  {
    name: 'Multi-System Solution', price: '$12,000', cadence: 'one-time project', highlight: true, badge: 'Most Popular',
    tagline: 'Connect and automate across your whole stack.',
    features: ['Multi-step automation suite', 'Unlimited app integrations', 'AI agent / chatbot component included', 'Document intelligence pipeline', '4 weeks priority support', 'Team training session'],
  },
  {
    name: 'Enterprise', price: 'from $30,000', cadence: 'scoped engagement', highlight: false,
    tagline: 'Org-wide deployment with dedicated support.',
    features: ['Everything in Multi-System', 'Multi-department rollout', 'Custom AI logic + security review', 'Dedicated automation engineer', 'SLA guarantee', 'Quarterly strategy reviews'],
  },
  {
    name: 'Custom', price: "Let's talk", cadence: 'tailored to you', highlight: false,
    tagline: 'When your stack needs something bespoke.',
    features: ['Bespoke API integrations for your stack', 'Scoped to your exact workflows', 'Flexible one-time or retainer', 'Ongoing optimization available'],
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const choose = (name) => navigate('/contact', { state: { package: name } });

  return (
    <section id="pricing" className="scroll-mt-24 bg-ink py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute -top-40 left-1/3 w-[700px] h-[700px] rounded-full bg-brand-600/15 blur-[150px] pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-16">
          <span className="text-brand-300 font-bold tracking-[0.18em] text-xs uppercase">Pricing</span>
          <h2 className="font-display font-bold text-white text-4xl lg:text-5xl mt-4 leading-tight">
            Fixed-scope pricing. Scale when you’re ready.
          </h2>
          <p className="text-white/60 text-lg mt-5 leading-relaxed">
            No retainer lock-ins, no hourly billing, no hidden costs. Pay for what you need — every project is priced upfront.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch">
          {plans.map((p) => {
            const hot = p.highlight;
            return (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-[22px] p-6 lg:p-7 transition-all duration-300 ${
                  hot
                    ? 'glossy-border bg-gradient-to-b from-brand-600/25 to-brand-800/10 shadow-[0_30px_70px_rgba(30,72,255,0.35)] lg:-translate-y-3'
                    : 'glossy-hover bg-white/[0.04] border border-white/10 hover:shadow-[0_0_45px_rgba(30,72,255,0.28)]'
                }`}
                data-testid={`plan-${p.name.toLowerCase().replace(/[^a-z]+/g, '-')}`}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-brand-700 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                    {p.badge}
                  </span>
                )}
                <h3 className="font-display font-bold text-white text-lg leading-tight min-h-[2.6rem]">{p.name}</h3>
                <div className="mt-3 font-display font-bold text-white text-[2rem] lg:text-[2.1rem] tracking-tight">{p.price}</div>
                <span className="text-white/45 text-sm font-medium mt-1">{p.cadence}</span>
                <p className="text-white/65 mt-4 leading-relaxed text-[15px]">{p.tagline}</p>

                <ul className="mt-6 space-y-3 flex-grow">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-600/25 text-brand-300 flex items-center justify-center flex-shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-white/80 text-[14px] leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => choose(p.name)}
                  className={`mt-8 w-full flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-[15px] group transition-all duration-300 ${
                    hot ? 'bg-gradient-to-r from-brand-500 to-brand-700 text-white hover:brightness-110' : 'border border-brand-400/60 text-brand-300 hover:bg-brand-600 hover:text-white hover:border-brand-600'
                  }`}
                  data-testid={`plan-cta-${p.name.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                >
                  Book a Call
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1 duration-300" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
