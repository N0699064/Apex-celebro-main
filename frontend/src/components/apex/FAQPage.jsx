import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CTABand from './CTABand';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

const faqs = [
  {
    q: 'What exactly does APEX CEREBRO do?',
    a: 'We design and build custom AI agents and automations that take over repetitive work — document processing, email and message handling, data entry, and app-to-app workflows — so your team can focus on higher-value work.',
  },
  {
    q: 'Which tools do you build with?',
    a: 'We build workflow automations in Make, Zapier, and n8n, add custom AI models where useful, and create bespoke API integrations when off-the-shelf tools fall short. We connect to what you already use — HubSpot, Salesforce, Pipedrive and more.',
  },
  {
    q: 'How long does a project take?',
    a: 'Most single-workflow projects (Simple Automation) ship in 1–2 weeks. Larger multi-system builds typically run 3–6 weeks depending on the scope and number of integrations.',
  },
  {
    q: 'Do I need any technical knowledge?',
    a: 'No. We keep the complexity under the hood, deploy everything for you, and hand over clear documentation and a short training session so your team can run it confidently.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We follow least-privilege access, handle credentials securely, and review every integration for security before go-live. We never use your data to train third-party models without your consent.',
  },
  {
    q: 'How much does it cost?',
    a: 'Pricing is fixed and shared upfront: Simple Automation from $4,500, Multi-System Solution from $12,000, Enterprise scoped per engagement, and Custom quotes for bespoke work. No hidden retainers or hourly billing.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every build is documented and handed over so you own it. If you want ongoing help, we offer optional monitoring, tuning, and expansion — otherwise it simply runs quietly in the background.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a call through the site and tell us your biggest bottleneck. We review every request and come back within one business day with a scoped approach and a clear next step.',
  },
];

const FAQPage = () => {
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
            <span className="text-white/85 text-[11px] font-semibold tracking-[0.22em] uppercase">FAQ</span>
          </div>
          <h1 className="font-display font-bold text-white text-4xl lg:text-6xl leading-tight max-w-3xl mx-auto">Questions, answered.</h1>
          <p className="text-white/65 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about working with us. Still curious? Book a call and ask us directly.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-black/10 rounded-2xl px-6 bg-white transition-all duration-300 data-[state=open]:border-brand-300 data-[state=open]:shadow-[0_16px_45px_rgba(30,72,255,0.10)]"
                data-testid={`faq-item-${i}`}
              >
                <AccordionTrigger className="font-display font-bold text-ink text-lg hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-ink/65 text-[15px] leading-relaxed pb-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTABand heading="Still have a question?" sub="Book a call and we'll walk you through exactly how we'd automate your biggest bottleneck." />
      <Footer />
    </div>
  );
};

export default FAQPage;
