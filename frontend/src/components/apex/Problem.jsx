import React from 'react';
import { X, Inbox, Repeat, Keyboard, FileWarning, Zap, BadgeCheck, ScanText, DollarSign } from 'lucide-react';

const manualTiles = [
  { icon: Inbox, label: 'Overflowing Inbox' },
  { icon: Repeat, label: 'Repetitive Tasks' },
  { icon: Keyboard, label: 'Manual Data Entry' },
  { icon: FileWarning, label: 'Lost Documents' },
];

const apexTiles = [
  { icon: Zap, label: 'Quicker Replies' },
  { icon: BadgeCheck, label: 'Clean, Sorted Data' },
  { icon: ScanText, label: 'Less Data Entry' },
  { icon: DollarSign, label: 'Cost Savings' },
];

const manualPoints = [
  { t: 'Everything done by hand', d: 'Every email, document and task is handled manually, eating into your day.' },
  { t: 'Missed opportunities', d: 'When you’re busy, enquiries and follow-ups slip through the cracks.' },
  { t: 'Time lost sorting', d: 'Hours go on sorting paperwork and forwarding messages to the right place.' },
  { t: 'Rising costs', d: 'You end up paying for extra help, or working late, just to keep up with admin.' },
];

const apexPoints = [
  { icon: Zap, t: 'Faster replies', d: 'Routine emails, forms and messages get a quick first response, even when you’re busy.' },
  { icon: BadgeCheck, t: 'Fewer missed enquiries', d: 'New requests are logged and followed up automatically, so fewer slip through.' },
  { icon: ScanText, t: 'Less paperwork', d: 'Key details are pulled from your documents for you. Only the tricky ones need your attention.' },
  { icon: DollarSign, t: 'Lower admin costs', d: 'Less time on admin means more time for paid work, without hiring extra help.' },
];

const MiniTile = ({ icon: Icon, label, tone }) => (
  <div className="rounded-xl bg-white border border-black/5 shadow-sm py-3 px-1.5 flex flex-col items-center text-center gap-1.5">
    <span className={`w-8 h-8 rounded-full flex items-center justify-center ${tone === 'bad' ? 'bg-red-50 text-red-400' : 'bg-brand-50 text-brand-600'}`}>
      <Icon size={15} strokeWidth={2} />
    </span>
    <span className="text-[11px] font-bold text-ink/70 leading-tight">{label}</span>
  </div>
);

const Problem = () => {
  return (
    <section id="problem" className="scroll-mt-24 bg-ink py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-brand-300 font-bold tracking-[0.18em] text-xs uppercase">The core problem we solve</span>
          <h2 className="font-display font-bold text-white text-4xl lg:text-5xl mt-4 leading-tight">
            You’re spending hours on work software should handle.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* The Manual Way */}
          <div className="glossy-border feature-card no-inner-glow overflow-hidden rounded-[24px] bg-white p-6 lg:p-7">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center"><X size={19} strokeWidth={2.6} /></span>
              <h3 className="font-display font-bold text-ink text-xl">The Manual Way</h3>
            </div>
            <div className="rounded-2xl bg-red-50/60 p-3 grid grid-cols-2 gap-2.5 mb-8 max-w-[280px] mx-auto">
              {manualTiles.map((t) => <MiniTile key={t.label} {...t} tone="bad" />)}
            </div>
            <ul className="space-y-5">
              {manualPoints.map((p) => (
                <li key={p.t} className="flex items-start gap-3">
                  <span className="mt-0.5 text-red-500 flex-shrink-0"><X size={20} strokeWidth={2.6} /></span>
                  <div>
                    <p className="font-bold text-ink">{p.t}</p>
                    <p className="text-ink/60 text-sm leading-relaxed mt-0.5">{p.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* The APEX CEREBRO Way */}
          <div className="glossy-border feature-card no-inner-glow overflow-hidden rounded-[24px] bg-white p-6 lg:p-7">
            <div className="flex items-center gap-2.5 mb-6">
              <img src="/apex-mark-dark.png" alt="APEX CEREBRO" className="h-5 w-auto" />
              <h3 className="font-display font-bold text-ink text-xl">The APEX CEREBRO Way</h3>
            </div>
            <div className="rounded-2xl bg-brand-50 p-3 grid grid-cols-2 gap-2.5 mb-8 max-w-[280px] mx-auto">
              {apexTiles.map((t) => <MiniTile key={t.label} {...t} tone="good" />)}
            </div>
            <ul className="space-y-5">
              {apexPoints.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.t} className="flex items-start gap-3">
                    <span className="mt-0.5 w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center flex-shrink-0"><Icon size={15} strokeWidth={2.2} /></span>
                    <div>
                      <p className="font-bold text-ink">{p.t}</p>
                      <p className="text-ink/60 text-sm leading-relaxed mt-0.5">{p.d}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
