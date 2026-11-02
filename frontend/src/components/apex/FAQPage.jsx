import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CTABand from './CTABand';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

const faqs = [
  {
    q: 'What exactly does APEX CEREBRO do?',
    a: 'We set up AI tools and automations that take care of repetitive work — like sorting documents, replying to routine messages, data entry and moving information between apps — so you can focus on the work that matters.',
  },
  {
    q: 'Which tools do you build with?',
    a: 'We build automations in Make, Zapier and n8n, add AI where it genuinely helps, and build custom connections when ready-made ones aren’t available. We work with the apps you already use.',
  },
  {
    q: 'How long does a project take?',
    a: 'Most single-task projects (Simple Automation) take 1–2 weeks. Larger projects that connect several tools usually take 3–6 weeks, depending on what’s involved.',
  },
  {
    q: 'Do I need any technical knowledge?',
    a: 'No. We handle the technical side, set everything up for you, and give you clear instructions and a short walkthrough so you can use it with confidence.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We only ask for the access we need, store logins securely and check every connection before it goes live. We never use your data to train third-party AI models without your permission.',
  },
  {
    q: 'How much does it cost?',
    a: 'Pricing is fixed and shared upfront. Each plan is a one-time build plus a retainer for ongoing support: Simple Automation £8,000 (+ £3,500 retainer), Multi-System Solution £15,000 (+ £7,000 retainer), Enterprise £35,000 (+ £15,000 retainer) and Custom from £50,000 (+ £35,000 retainer). No hourly billing or hidden costs.',
  },
  {
    q: 'What happens after launch?',
    a: 'Everything we build is documented and handed over, so it’s yours. If you’d like ongoing help, we offer optional support and improvements — otherwise it simply keeps running in the background.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a call through the site and tell us what’s taking up most of your time. We review every request and get back to you within one business day with a suggested approach and a clear next step.',
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
            Everything you need to know about working with us.<br className="hidden sm:block" />{' '}
            Still curious? Book a call and ask us directly.
          </p>
        </div>
      </section>

      {/* Top padding matches the CTA band's top padding so the gaps above and below the list are equal */}
      <section className="pt-16 lg:pt-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-black/10 rounded-2xl px-6 bg-white transition-all duration-300 data-[state=open]:border-brand-300 data-[state=open]:shadow-[0_16px_45px_rgba(0,0,255,0.10)]"
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

      <CTABand heading="Still have a question?" sub="Book a call and we'll walk you through exactly how we could save you time." />
      <Footer />
    </div>
  );
};

export default FAQPage;
