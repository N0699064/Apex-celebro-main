import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

const BOTTLENECKS = [
  'High volume of emails/messages',
  'Manual paperwork / document sorting',
  'Slow response times',
  'Data entry backlogs',
];

const PACKAGES = [
  'Simple Automation',
  'Multi-System Solution',
  'Enterprise',
  'Custom',
];

const inputCls = 'h-12 rounded-xl border-black/12 bg-white text-ink placeholder:text-ink/35 focus-visible:ring-brand-600 focus-visible:ring-2';

const IntakeForm = ({ initialPackage = '' }) => {
  const [form, setForm] = useState({ companyName: '', website: '', decisionMaker: '', hours: '', otherBottleneck: '', email: '', phone: '' });
  const [bottlenecks, setBottlenecks] = useState([]);
  const [pkg, setPkg] = useState(initialPackage);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { if (initialPackage) setPkg(initialPackage); }, [initialPackage]);

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: '' })); };
  const toggle = (b) => {
    setBottlenecks((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
    if (errors.bottlenecks) setErrors((e) => ({ ...e, bottlenecks: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.companyName.trim()) e.companyName = 'Company name is required';
    if (bottlenecks.length === 0 && !form.otherBottleneck.trim()) e.bottlenecks = 'Select at least one bottleneck';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address';
    if (!form.phone.trim()) e.phone = 'A contact phone number is required';
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const payload = { ...form, bottlenecks, package: pkg, submittedAt: new Date().toISOString() };
    try {
      const prev = JSON.parse(localStorage.getItem('apex_leads') || '[]');
      localStorage.setItem('apex_leads', JSON.stringify([payload, ...prev]));
    } catch (_) {}
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-[28px] border border-black/8 p-10 lg:p-14 text-center shadow-[0_20px_60px_rgba(5,10,30,0.08)]">
        <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-7">
          <CheckCircle2 size={44} className="text-brand-600" />
        </div>
        <h2 className="font-display font-bold text-3xl text-ink mb-4">Request received.</h2>
        <p className="text-ink/65 text-lg leading-relaxed max-w-md mx-auto">
          We review every submission before scheduling a call. You&rsquo;ll hear from us within
          <span className="font-semibold text-ink"> 1 business day</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-[28px] border border-black/8 p-7 sm:p-10 shadow-[0_20px_60px_rgba(5,10,30,0.08)] space-y-7" noValidate data-testid="intake-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-ink font-semibold">Company Name <span className="text-brand-600">*</span></Label>
          <Input value={form.companyName} onChange={(e) => set('companyName', e.target.value)} placeholder="Acme Operations Inc." className={inputCls} />
          {errors.companyName && <p className="text-sm text-red-600">{errors.companyName}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-ink font-semibold">Company Website</Label>
          <Input value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="acme.com" className={inputCls} />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-ink font-semibold">Who handles the decision-making for this project?</Label>
        <Input value={form.decisionMaker} onChange={(e) => set('decisionMaker', e.target.value)} placeholder="Name & role (e.g. Jordan Lee, COO)" className={inputCls} />
      </div>

      <div className="space-y-3">
        <Label className="text-ink font-semibold">Your biggest operational bottleneck <span className="text-brand-600">*</span></Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BOTTLENECKS.map((b) => {
            const active = bottlenecks.includes(b);
            return (
              <label key={b} className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 cursor-pointer transition-colors ${active ? 'border-brand-600 bg-brand-50' : 'border-black/12 hover:border-black/25'}`}>
                <Checkbox checked={active} onCheckedChange={() => toggle(b)} className="w-5 h-5 rounded-md border-ink/25 data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600" />
                <span className="text-[15px] text-ink/80 leading-snug">{b}</span>
              </label>
            );
          })}
        </div>
        <Input value={form.otherBottleneck} onChange={(e) => set('otherBottleneck', e.target.value)} placeholder="Other (tell us in a few words)" className={inputCls} />
        {errors.bottlenecks && <p className="text-sm text-red-600">{errors.bottlenecks}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-ink font-semibold">Hours per week lost to this</Label>
          <Input type="number" min="0" value={form.hours} onChange={(e) => set('hours', e.target.value)} placeholder="e.g. 20" className={inputCls} />
        </div>
        <div className="space-y-2">
          <Label className="text-ink font-semibold">Package interest</Label>
          <Select value={pkg} onValueChange={setPkg}>
            <SelectTrigger className={`${inputCls} data-[placeholder]:text-ink/35`}>
              <SelectValue placeholder="Select a package" />
            </SelectTrigger>
            <SelectContent>
              {PACKAGES.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-ink font-semibold">Direct email <span className="text-brand-600">*</span></Label>
          <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@company.com" className={inputCls} />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-ink font-semibold">Best contact phone <span className="text-brand-600">*</span></Label>
          <Input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(555) 123-4567" className={inputCls} />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white rounded-full py-4 font-bold text-lg transition-colors duration-300 group" data-testid="intake-submit">
        Request My Consultation
        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1 duration-300" />
      </button>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-1 text-sm text-ink/50">
        <span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-brand-600" /> Reviewed before any call</span>
        <span className="flex items-center gap-1.5"><Clock size={15} className="text-brand-600" /> Reply within 1 business day</span>
      </div>
    </form>
  );
};

export default IntakeForm;
