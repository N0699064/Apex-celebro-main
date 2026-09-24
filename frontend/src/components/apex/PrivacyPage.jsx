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

const PrivacyPage = () => (
  <LegalShell title="Privacy Policy" updated={new Date().toLocaleDateString()}>
    <p>APEX CEREBRO (“we”, “us”) respects your privacy. This policy explains what we collect through this website and how we use it.</p>
    <Section heading="Information we collect">
      <p>When you submit the consultation intake form, we collect the details you provide — such as your company name, website, decision-maker, described bottleneck, estimated hours lost, package interest, email, and phone number. We also collect basic, anonymous usage analytics.</p>
    </Section>
    <Section heading="How we use it">
      <p>We use your information solely to review your request, assess fit, and contact you about a potential engagement. We do not sell your data. We do not send unsolicited marketing without your consent.</p>
    </Section>
    <Section heading="Data retention & security">
      <p>We retain submissions only as long as needed to evaluate and follow up on your inquiry, and we apply reasonable safeguards to protect them. You may request deletion of your data at any time.</p>
    </Section>
    <Section heading="Contact">
      <p>Questions about this policy? Email <a href="mailto:hello@apexcerebro.com" className="text-brand-600 font-semibold">hello@apexcerebro.com</a>.</p>
    </Section>
  </LegalShell>
);

export default PrivacyPage;
