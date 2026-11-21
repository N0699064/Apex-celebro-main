// Calendly "invitee.created" webhook -> AI-written meeting-prep deck, emailed as a .pptx.
//
// Runs as a Netlify *background* function (the "-background" suffix): Netlify answers
// Calendly with 202 straight away, and this code has up to 15 minutes to finish.
//
// Env vars: CALENDLY_WEBHOOK_SIGNING_KEY, ANTHROPIC_API_KEY, RESEND_API_KEY,
//           MEETING_PREP_FROM, optional MEETING_PREP_TO (default ceo@apexcerebro.co.uk), optional MEETING_PREP_PRESENTER (name on the title slide),
//           optional REQUIRE_PAYMENT ("false" to skip the paid check).
import crypto from 'node:crypto';
import { Resend } from 'resend';
import { writeBriefing } from '../lib/briefing.mjs';
import { buildDeck } from '../lib/deck.mjs';

const SIGNATURE_TOLERANCE_S = 5 * 60;

function verifySignature(rawBody, header, key) {
  if (!header || !key) return false;
  const parts = Object.fromEntries(header.split(',').map((kv) => kv.trim().split('=')));
  const { t, v1 } = parts;
  if (!t || !v1) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > SIGNATURE_TOLERANCE_S) return false;
  const expected = crypto.createHmac('sha256', key).update(`${t}.${rawBody}`).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(v1);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

const londonDate = (iso) => (iso
  ? new Date(iso).toLocaleString('en-GB', {
    timeZone: 'Europe/London', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
  : 'Date not given');

// The site's booking funnel (src/components/apex/BookingFunnel.jsx) sends its answers to
// Calendly as "Label: value" lines in one custom question. Pull them back out.
const FIELDS = {
  company: 'Company', industry: 'Industry', teamSize: 'Team size', bottlenecks: 'Time drains',
  hours: 'Admin hours/week', timeline: 'Timeline', note: 'Notes',
};

function toBooking(p) {
  const qa = p.questions_and_answers || [];
  const answersText = qa.map((x) => x.answer).filter(Boolean).join('\n');
  const answers = {};
  for (const [key, label] of Object.entries(FIELDS)) {
    const m = answersText.match(new RegExp(`^${label.replace(/[/]/g, '\\/')}:\\s*(.+)$`, 'm'));
    if (m && m[1].trim() !== 'Not given') answers[key] = m[1].trim();
  }
  const pay = p.payment;
  const ev = p.scheduled_event || {};
  const minutes = ev.start_time && ev.end_time ? Math.round((new Date(ev.end_time) - new Date(ev.start_time)) / 60000) : null;
  return {
    name: p.name || 'Unknown',
    email: p.email || '',
    company: answers.company || '',
    answers,
    meetingType: ev.name || 'Consultation',
    meetingDate: londonDate(ev.start_time),
    startTime: ev.start_time,
    minutes,
    amountPaid: pay ? `${pay.currency === 'GBP' ? '£' : `${pay.currency} `}${pay.amount}` : 'Not recorded',
    amount: pay ? Number(pay.amount) : null,
    paid: Boolean(pay && pay.successful !== false),
    presenter: process.env.MEETING_PREP_PRESENTER || 'Apex Cerebro',
    answersText,
  };
}

// The deck is designed for the £120 45-Minute Consultation (Calendly link /30min).
// Match on any of: a 45-minute slot, "45" in the event name, or a £120 payment.
const is45MinuteSession = (b) => b.minutes === 45 || /\b45\b/.test(b.meetingType) || b.amount === 120;

const safeFile = (s) => s.replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-').slice(0, 60) || 'client';

async function sendEmail({ booking, deck, error }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const who = booking.company ? `${booking.name} (${booking.company})` : booking.name;
  const date = (booking.startTime || '').slice(0, 10);
  const lines = [
    `${who} booked a ${booking.meetingType} for ${booking.meetingDate} (paid ${booking.amountPaid}).`,
    `Email: ${booking.email}`,
    '',
    error
      ? `The prep deck could not be generated (${error}). Their answers are below.`
      : 'Your prep deck is attached.',
    '',
    booking.answersText,
  ];

  const { error: sendErr } = await resend.emails.send({
    from: process.env.MEETING_PREP_FROM,
    to: (process.env.MEETING_PREP_TO || 'ceo@apexcerebro.co.uk').split(',').map((s) => s.trim()),
    replyTo: booking.email || undefined,
    subject: `${error ? '[No deck] ' : ''}Meeting prep: ${who}, ${booking.meetingDate}`,
    text: lines.join('\n'),
    attachments: deck
      ? [{ filename: `Meeting-prep-${safeFile(booking.company || booking.name)}-${date}.pptx`, content: deck.toString('base64') }]
      : undefined,
  });
  if (sendErr) throw new Error(`Resend: ${sendErr.message || JSON.stringify(sendErr)}`);
}

export default async (req) => {
  const raw = await req.text();

  if (!verifySignature(raw, req.headers.get('calendly-webhook-signature'), process.env.CALENDLY_WEBHOOK_SIGNING_KEY)) {
    console.warn('Rejected webhook: bad or missing Calendly signature');
    return;
  }

  const body = JSON.parse(raw);
  if (body.event !== 'invitee.created') return;

  const booking = toBooking(body.payload || {});
  if (process.env.REQUIRE_PAYMENT !== 'false' && !booking.paid) {
    console.log(`Skipping unpaid booking for ${booking.email}`);
    return;
  }
  if (!is45MinuteSession(booking)) {
    console.log(`Skipping ${booking.meetingType} (${booking.minutes} min): decks are only made for the 45-Minute Consultation`);
    return;
  }

  let deck = null;
  let failure = null;
  try {
    const briefing = await writeBriefing(booking);
    deck = await buildDeck(booking, briefing);
  } catch (err) {
    console.error('Deck generation failed:', err);
    failure = err.message || String(err);
  }

  await sendEmail({ booking, deck, error: failure });
  console.log(`Meeting prep sent for ${booking.email}${failure ? ' (without deck)' : ''}`);
};
