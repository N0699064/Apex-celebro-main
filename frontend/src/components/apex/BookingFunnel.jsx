import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X, ArrowLeft, ArrowRight, Check, CheckCircle2,
  ShoppingBag, Briefcase, Megaphone, Code2, Building2, HeartPulse,
  Inbox, Keyboard, FileText, UserPlus, BarChart3, Headphones,
} from 'lucide-react';

// Single-choice steps auto-advance on click; multi-choice steps need "Continue".
const steps = [
  {
    key: 'industry',
    q: 'What best describes your business?',
    type: 'single',
    options: [
      { v: 'E-commerce', icon: ShoppingBag },
      { v: 'Professional services', icon: Briefcase },
      { v: 'Agency / Marketing', icon: Megaphone },
      { v: 'SaaS / Tech', icon: Code2 },
      { v: 'Healthcare', icon: HeartPulse },
      { v: 'Other', icon: Building2 },
    ],
  },
  {
    key: 'teamSize',
    q: 'How big is your team?',
    type: 'single',
    options: [{ v: 'Just me' }, { v: '2–10' }, { v: '11–50' }, { v: '51–200' }, { v: '200+' }],
  },
  {
    key: 'bottlenecks',
    q: 'Where is your team losing the most time?',
    hint: 'Pick all that apply',
    type: 'multi',
    options: [
      { v: 'Email & inbox', icon: Inbox },
      { v: 'Manual data entry', icon: Keyboard },
      { v: 'Documents & paperwork', icon: FileText },
      { v: 'Lead follow-up', icon: UserPlus },
      { v: 'Reporting', icon: BarChart3 },
      { v: 'Customer support', icon: Headphones },
    ],
  },
  {
    key: 'hours',
    q: 'Roughly how many hours a week go on repetitive admin?',
    type: 'single',
    options: [{ v: 'Under 5' }, { v: '5–15' }, { v: '15–30' }, { v: '30+' }],
  },
  {
    key: 'timeline',
    q: 'When are you looking to get started?',
    type: 'single',
    options: [{ v: 'As soon as possible' }, { v: 'Within 1–3 months' }, { v: 'Just exploring' }],
  },
  { key: 'details', q: 'Last step — where should we send the invite?', type: 'details' },
];

const TOTAL = steps.length;

const buildCalendlyUrl = (base, a, d) => {
  const summary = [
    `Company: ${d.company || '—'}`,
    `Industry: ${a.industry}`,
    `Team size: ${a.teamSize}`,
    `Bottlenecks: ${(a.bottlenecks || []).join(', ')}`,
    `Admin hours/week: ${a.hours}`,
    `Timeline: ${a.timeline}`,
    d.note ? `Notes: ${d.note}` : null,
  ].filter(Boolean).join('\n');

  const p = new URLSearchParams({
    embed_domain: window.location.host,
    embed_type: 'Inline',
    hide_gdpr_banner: '1',
    primary_color: '0000ff',
    name: d.name,
    email: d.email,
    a1: summary,
  });
  return `${base}?${p.toString()}`;
};

const OptionButton = ({ opt, selected, onClick, index }) => {
  const I = opt.icon;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex items-center gap-3 w-full text-left rounded-2xl border-2 px-4 py-4 font-semibold text-[15px] transition-colors ${
        selected ? 'border-brand bg-brand-50 text-ink' : 'border-black/8 bg-white text-ink/80 hover:border-brand-300'
      }`}
    >
      {I && (
        <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${selected ? 'bg-brand text-white' : 'bg-brand-50 text-brand'}`}>
          <I size={19} />
        </span>
      )}
      <span className="flex-grow">{opt.v}</span>
      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected ? 'bg-brand border-brand text-white scale-100' : 'border-black/15 scale-90'}`}>
        {selected && <Check size={14} strokeWidth={3} />}
      </span>
    </motion.button>
  );
};

const BookingFunnel = ({ open, onClose, session }) => {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState({});
  const [details, setDetails] = useState({ name: '', email: '', company: '', note: '' });
  const [showCalendar, setShowCalendar] = useState(false);
  const [booked, setBooked] = useState(false);

  // Reset whenever the funnel is (re)opened
  useEffect(() => {
    if (open) {
      setStep(0); setDir(1); setAnswers({}); setShowCalendar(false); setBooked(false);
      setDetails({ name: '', email: '', company: '', note: '' });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    const onMsg = (e) => {
      if (e.origin === 'https://calendly.com' && e.data?.event === 'calendly.event_scheduled') setBooked(true);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('message', onMsg);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('message', onMsg);
    };
  }, [open, onClose]);

  const current = steps[step];
  const go = (to) => { setDir(to > step ? 1 : -1); setStep(to); };

  const pickSingle = (key, v) => {
    setAnswers((a) => ({ ...a, [key]: v }));
    setTimeout(() => go(step + 1), 220);
  };
  const toggleMulti = (key, v) => {
    setAnswers((a) => {
      const cur = a[key] || [];
      return { ...a, [key]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });
  };

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email);
  const detailsOk = details.name.trim().length > 1 && emailOk;

  const calendlyUrl = useMemo(
    () => (showCalendar && session ? buildCalendlyUrl(session.url, answers, details) : ''),
    [showCalendar, session, answers, details],
  );

  const progress = showCalendar ? 100 : Math.round((step / TOTAL) * 100);

  return (
    <AnimatePresence>
      {open && session && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          role="dialog" aria-modal="true" aria-label={`Book the ${session.title}`}
        >
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className={`relative w-full bg-white sm:rounded-[28px] shadow-[0_40px_100px_rgba(2,16,72,0.45)] flex flex-col overflow-hidden h-full sm:h-auto sm:max-h-[92vh] ${showCalendar ? 'sm:max-w-4xl' : 'sm:max-w-xl'}`}
            data-testid="booking-funnel"
          >
            {/* Header */}
            <div className="bg-ink text-white px-6 pt-5 pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-brand-300 text-[11px] font-bold tracking-[0.18em] uppercase">{session.price} · {session.title}</p>
                  <p className="text-white/60 text-xs mt-1">
                    {showCalendar ? 'Pick a time that works' : `Question ${step + 1} of ${TOTAL}`}
                  </p>
                </div>
                <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Close">
                  <X size={18} />
                </button>
              </div>
              <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div className="h-full bg-brand rounded-full" animate={{ width: `${progress}%` }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} />
              </div>
            </div>

            {/* Body */}
            <div className="flex-grow overflow-y-auto">
              {showCalendar ? (
                booked ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="px-8 py-16 text-center">
                    <span className="w-16 h-16 mx-auto rounded-full bg-brand-50 text-brand flex items-center justify-center"><CheckCircle2 size={34} /></span>
                    <h3 className="font-display font-bold text-ink text-2xl mt-5">You&rsquo;re booked in, {details.name.split(' ')[0]}.</h3>
                    <p className="text-ink/60 mt-2 max-w-sm mx-auto">A calendar invite is on its way to {details.email}. We&rsquo;ll review your answers before the call.</p>
                    <button onClick={onClose} className="mt-8 bg-ink hover:bg-ink-800 text-white rounded-full px-7 py-3 font-bold text-sm transition-colors">Done</button>
                  </motion.div>
                ) : (
                  <iframe title="Book a time" src={calendlyUrl} className="w-full h-[70vh] sm:h-[680px] border-0" />
                )
              ) : (
                <div className="px-6 sm:px-8 py-7">
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={step}
                      custom={dir}
                      initial={{ opacity: 0, x: 40 * dir }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 * dir }}
                      transition={{ duration: 0.22 }}
                    >
                      <h3 className="font-display font-bold text-ink text-2xl leading-tight">{current.q}</h3>
                      {current.hint && <p className="text-ink/50 text-sm mt-1.5">{current.hint}</p>}

                      {current.type === 'single' && (
                        <div className={`mt-6 grid gap-3 ${current.options.length > 4 ? 'sm:grid-cols-2' : ''}`}>
                          {current.options.map((o, i) => (
                            <OptionButton key={o.v} opt={o} index={i} selected={answers[current.key] === o.v} onClick={() => pickSingle(current.key, o.v)} />
                          ))}
                        </div>
                      )}

                      {current.type === 'multi' && (
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          {current.options.map((o, i) => (
                            <OptionButton key={o.v} opt={o} index={i} selected={(answers[current.key] || []).includes(o.v)} onClick={() => toggleMulti(current.key, o.v)} />
                          ))}
                        </div>
                      )}

                      {current.type === 'details' && (
                        <div className="mt-6 space-y-3">
                          {[
                            { k: 'name', ph: 'Full name *', type: 'text', ac: 'name' },
                            { k: 'email', ph: 'Work email *', type: 'email', ac: 'email' },
                            { k: 'company', ph: 'Company name', type: 'text', ac: 'organization' },
                          ].map((f) => (
                            <input
                              key={f.k}
                              type={f.type}
                              autoComplete={f.ac}
                              placeholder={f.ph}
                              value={details[f.k]}
                              onChange={(e) => setDetails((d) => ({ ...d, [f.k]: e.target.value }))}
                              className="w-full rounded-2xl border-2 border-black/8 focus:border-brand outline-none px-4 py-3.5 text-[15px] text-ink placeholder:text-ink/40 transition-colors"
                            />
                          ))}
                          <textarea
                            rows={3}
                            placeholder="Anything else we should know? (optional)"
                            value={details.note}
                            onChange={(e) => setDetails((d) => ({ ...d, note: e.target.value }))}
                            className="w-full rounded-2xl border-2 border-black/8 focus:border-brand outline-none px-4 py-3.5 text-[15px] text-ink placeholder:text-ink/40 resize-none transition-colors"
                          />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer nav */}
            {!showCalendar && (
              <div className="border-t border-black/8 px-6 sm:px-8 py-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => go(step - 1)}
                  disabled={step === 0}
                  className="flex items-center gap-1.5 text-ink/60 hover:text-ink disabled:opacity-0 font-semibold text-sm transition-colors"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                {current.type === 'multi' && (
                  <button
                    onClick={() => go(step + 1)}
                    disabled={!(answers[current.key] || []).length}
                    className="flex items-center gap-2 bg-ink hover:bg-ink-800 disabled:opacity-40 text-white rounded-full px-6 py-3 font-bold text-sm transition-all"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                )}
                {current.type === 'details' && (
                  <button
                    onClick={() => setShowCalendar(true)}
                    disabled={!detailsOk}
                    className="flex items-center gap-2 bg-brand hover:bg-brand-700 disabled:opacity-40 text-white rounded-full px-6 py-3 font-bold text-sm transition-all"
                    data-testid="funnel-to-calendar"
                  >
                    Choose a time <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingFunnel;
