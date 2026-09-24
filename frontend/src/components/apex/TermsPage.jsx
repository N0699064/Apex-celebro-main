import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LegalShell = ({ title, updated, children }) => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-black/8">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5 select-none">
            <img src="/apex-mark-dark.png" alt="APEX CEREBRO" className="h-[22px] w-auto" />
            <span className="font-display font-bold text-[17px] tracking-tight">APEX <span className="font-medium opacity-70">CEREBRO</span></span>
          </button>
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-ink/60 hover:text-brand-600 transition-colors font-medium text-sm">
            <ArrowLeft size={18} /> Back to home
          </button>
        </div>
      </div>
      <div className="container mx-auto px-6 max-w-3xl py-16">
        <h1 className="font-display font-bold text-4xl lg:text-5xl text-ink mb-3">{title}</h1>
        <p className="text-ink/50 mb-12">Last updated: {updated}</p>
        <div className="space-y-8 text-ink/70 leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

const Section = ({ heading, children }) => (
  <section>
    <h2 className="font-display font-bold text-xl text-ink mb-3">{heading}</h2>
    {children}
  </section>
);

const TermsPage = () => (
  <LegalShell title="Terms of Service" updated={new Date().toLocaleDateString()}>
    <p>These terms govern your use of the APEX CEREBRO website. By using this site or submitting the consultation form, you agree to them.</p>
    <Section heading="Consultations & scope">
      <p>Submitting the intake form is a request for review, not a binding engagement. Any project scope, deliverables, and pricing are confirmed in a separate written agreement before work begins.</p>
    </Section>
    <Section heading="Pricing">
      <p>Package prices shown on this site are indicative, fixed-scope starting points. Final pricing is confirmed in your engagement agreement based on the systems and integrations required.</p>
    </Section>
    <Section heading="Use of the site">
      <p>You agree to provide accurate information and not to misuse the site or attempt to disrupt its operation. Content on this site is provided “as is” without warranties of any kind.</p>
    </Section>
    <Section heading="Contact">
      <p>Questions about these terms? Email <a href="mailto:hello@apexcerebro.com" className="text-brand-600 font-semibold">hello@apexcerebro.com</a>.</p>
    </Section>
  </LegalShell>
);

export default TermsPage;
