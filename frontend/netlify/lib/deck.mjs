// Draws the 45-Minute Consultation prep deck in the Apex Cerebro slide style
// (dark gradient title/close, light lavender content slides, navy titles, brand-blue accents).
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import PptxGenJS from 'pptxgenjs';
import { PACKAGES } from './packages.mjs';

// ---------- Style ----------
const C = {
  page: 'EEF0FB', navy: '021048', blue: '0000FF', muted: '8A93B8', label: '9AA1C0',
  card: 'FFFFFF', border: 'DCE0F5', lilac: 'A3A8FF', iconBg: 'E2E5FA', strip: 'E3E6FB',
  pill: '1F2BFF', onDarkMuted: '8C9BFF',
};
// The site uses Manrope, but a font the viewer lacks gets substituted badly (worst in tables).
// Segoe UI ships with Windows; set MEETING_PREP_FONT=Manrope if it is installed where decks are opened.
const FONT = process.env.MEETING_PREP_FONT || 'Segoe UI';
const W = 13.333;
const X0 = 0.66; // left margin
const CW = W - 2 * X0; // content width

// ---------- Assets ----------
function findFile(rel) {
  let here = '';
  try { here = path.dirname(fileURLToPath(import.meta.url)); } catch { /* bundled as CJS */ }
  const roots = [process.cwd(), process.env.LAMBDA_TASK_ROOT, here, here && path.resolve(here, '..'), here && path.resolve(here, '../..')]
    .filter(Boolean);
  for (const root of roots) {
    for (const p of [path.join(root, rel), path.join(root, 'frontend', rel)]) if (fs.existsSync(p)) return p;
  }
  return null;
}

let logoData;
function logo() {
  if (logoData === undefined) {
    const p = findFile('public/apex-mark-white.png');
    logoData = p ? `data:image/png;base64,${fs.readFileSync(p).toString('base64')}` : null;
  }
  return logoData;
}

// Dark navy -> brand blue gradient, rendered as a PNG (pptxgenjs has no gradient fills).
let gradientData;
function gradient() {
  if (gradientData) return gradientData;
  const w = 800; const h = 450;
  const from = [2, 12, 58]; const to = [6, 6, 255];
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y += 1) {
    const row = y * (w * 3 + 1);
    raw[row] = 0;
    for (let x = 0; x < w; x += 1) {
      const t = Math.min(1, Math.max(0, (x / w) * 0.9 + (y / h) * 0.1 - 0.05));
      const e = t * t * (3 - 2 * t);
      for (let c = 0; c < 3; c += 1) raw[row + 1 + x * 3 + c] = Math.round(from[c] + (to[c] - from[c]) * e);
    }
  }
  const crcTable = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc = (buf) => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]);
    const crcBuf = Buffer.alloc(4); crcBuf.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, crcBuf]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0)),
  ]);
  gradientData = `data:image/png;base64,${png.toString('base64')}`;
  return gradientData;
}

// ---------- Helpers ----------
const clip = (s, n) => {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t;
};
const list = (a, n) => (Array.isArray(a) ? a.slice(0, n) : []);

function makeDeck() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Apex Cerebro';
  pptx.company = 'Apex Cerebro';
  const R = pptx.ShapeType;

  const text = (slide, t, o) => slide.addText(t, { fontFace: FONT, color: C.navy, margin: 0, valign: 'top', ...o });
  const box = (slide, o) => slide.addShape(R.roundRect, {
    rectRadius: 0.14, fill: { color: C.card }, line: { color: C.border, width: 0.75 }, ...o,
  });
  const pillShape = (slide, o) => slide.addShape(R.roundRect, { rectRadius: (o.h || 0.3) / 2, line: { type: 'none' }, ...o });

  const darkSlide = () => {
    const s = pptx.addSlide();
    s.background = { color: C.navy };
    s.addImage({ data: gradient(), x: 0, y: 0, w: W, h: 7.5 });
    return s;
  };

  const logoCircle = (s, x, y, d = 1.0) => {
    s.addShape(R.ellipse, { x, y, w: d, h: d, fill: { type: 'none' }, line: { color: 'FFFFFF', width: 2.25 } });
    const img = logo();
    if (img) {
      const lw = d * 0.56; const lh = lw * (1219 / 1900);
      s.addImage({ data: img, x: x + (d - lw) / 2, y: y + (d - lh) / 2, w: lw, h: lh });
    } else {
      text(s, 'APEX', { x, y, w: d, h: d, align: 'center', valign: 'middle', fontSize: 10, bold: true, color: 'FFFFFF' });
    }
  };

  // Light content slide frame: icon tile, section label, title, subtitle.
  const lightSlide = (label, title, subtitle, footer) => {
    const s = pptx.addSlide();
    s.background = { color: C.page };
    s.addShape(R.roundRect, { x: X0, y: 0.55, w: 0.72, h: 0.72, rectRadius: 0.14, fill: { color: C.iconBg }, line: { type: 'none' } });
    s.addShape(R.ellipse, { x: X0 + 0.2, y: 0.75, w: 0.32, h: 0.32, fill: { type: 'none' }, line: { color: C.blue, width: 2 } });
    text(s, label.toUpperCase(), { x: W - X0 - 6, y: 0.72, w: 6, h: 0.3, align: 'right', fontSize: 11, bold: true, color: C.label, charSpacing: 1 });
    text(s, clip(title, 70), { x: X0, y: 1.55, w: CW, h: 0.6, fontSize: 26, bold: true });
    if (subtitle) text(s, clip(subtitle, 200), { x: X0, y: 2.15, w: CW, h: 0.55, fontSize: 13, color: C.muted });
    if (footer) text(s, footer, { x: X0, y: 7.08, w: CW, h: 0.25, fontSize: 9, color: C.label });
    return s;
  };

  const dotList = (s, items, x, y, w, { size = 12, gap = 0.36, color = C.navy, dot = C.blue } = {}) => {
    items.forEach((it, i) => {
      s.addShape(R.ellipse, { x, y: y + i * gap + 0.06, w: 0.13, h: 0.13, fill: { color: dot }, line: { type: 'none' } });
      text(s, it, { x: x + 0.28, y: y + i * gap, w: w - 0.28, h: gap, fontSize: size, color });
    });
  };

  const table = (s, header, rows, colW, y) => {
    const head = header.map((h) => ({ text: h, options: { bold: true, color: 'FFFFFF', fill: { color: C.blue } } }));
    const body = rows.map((r) => r.map((cell, i) => ({
      text: cell,
      options: { color: i === 0 && r.length > 2 ? C.blue : C.navy, bold: i === 0 && r.length > 2, fill: { color: C.card } },
    })));
    s.addTable([head, ...body], {
      x: X0, y, w: CW, colW, fontFace: FONT, fontSize: 12, valign: 'middle',
      margin: [0.08, 0.16, 0.08, 0.16],
      border: { type: 'solid', pt: 0.75, color: C.border },
      rowH: 0.42,
    });
  };

  return { pptx, R, text, box, pillShape, darkSlide, logoCircle, lightSlide, dotList, table };
}

// ---------- Slides ----------
export async function buildDeck(booking, b) {
  const { pptx, R, text, box, pillShape, darkSlide, logoCircle, lightSlide, dotList, table } = makeDeck();
  const a = booking.answers;
  const company = booking.company || booking.name;
  const footer = `${clip(company, 40)}  ·  ${booking.meetingDate}  ·  Internal prep, not for sharing`;

  // A. Title
  {
    const s = darkSlide();
    pillShape(s, { x: X0, y: 0.9, w: 2.35, h: 0.46, fill: { color: C.pill } });
    text(s, 'FOCUSED DEEP-DIVE', { x: X0, y: 0.9, w: 2.35, h: 0.46, align: 'center', valign: 'middle', fontSize: 11, bold: true, color: 'FFFFFF', charSpacing: 1 });
    text(s, clip(company, 48), { x: X0, y: 2.75, w: 10.5, h: 0.95, fontSize: 40, bold: true, color: 'FFFFFF', valign: 'bottom' });
    text(s, '45-Minute Consultation', { x: X0, y: 3.85, w: 10, h: 0.5, fontSize: 20, color: C.onDarkMuted });
    text(s, `${booking.meetingDate}   |   ${booking.presenter}`, { x: X0, y: 4.5, w: 10, h: 0.35, fontSize: 13, color: C.onDarkMuted });
    text(s, `${clip(booking.name, 40)}  ·  ${clip(booking.email, 50)}  ·  Paid ${booking.amountPaid}`, { x: X0, y: 6.55, w: 9.5, h: 0.3, fontSize: 11, color: 'B8C0FF' });
    logoCircle(s, 11.25, 5.85, 1.05);
  }

  // Client snapshot
  {
    const s = lightSlide('Client snapshot', `${company} at a glance`, b.headline_summary, footer);
    const stats = [['Industry', a.industry], ['Team size', a.teamSize], ['Admin hours / week', a.hours], ['Timeline', a.timeline]];
    const cw = (CW - 3 * 0.22) / 4;
    stats.forEach(([k, v], i) => {
      const x = X0 + i * (cw + 0.22);
      box(s, { x, y: 2.9, w: cw, h: 1.25 });
      text(s, k.toUpperCase(), { x: x + 0.25, y: 3.08, w: cw - 0.5, h: 0.25, fontSize: 9, bold: true, color: C.label, charSpacing: 1 });
      text(s, clip(v || 'Not given', 26), { x: x + 0.25, y: 3.42, w: cw - 0.5, h: 0.55, fontSize: 19, bold: true });
    });
    const hw = (CW - 0.22) / 2;
    box(s, { x: X0, y: 4.38, w: hw, h: 2.5 });
    text(s, 'WHERE THEY ARE LOSING TIME', { x: X0 + 0.3, y: 4.58, w: hw - 0.6, h: 0.25, fontSize: 9, bold: true, color: C.label, charSpacing: 1 });
    const drains = (a.bottlenecks || '').split(',').map((d) => d.trim()).filter(Boolean).slice(0, 5);
    dotList(s, drains.length ? drains : ['Not given'], X0 + 0.3, 4.98, hw - 0.6, { size: 13, gap: 0.36 });
    const x2 = X0 + hw + 0.22;
    box(s, { x: x2, y: 4.38, w: hw, h: 2.5, fill: { color: C.card } });
    text(s, 'FOCUS FOR THIS CALL', { x: x2 + 0.3, y: 4.58, w: hw - 0.6, h: 0.25, fontSize: 9, bold: true, color: C.label, charSpacing: 1 });
    text(s, clip(b.focus_task, 60), { x: x2 + 0.3, y: 4.9, w: hw - 0.6, h: 0.45, fontSize: 17, bold: true, color: C.blue });
    text(s, a.note ? `“${clip(a.note, 170)}”` : 'No extra notes left in the booking form.', {
      x: x2 + 0.3, y: 5.45, w: hw - 0.6, h: 1.25, fontSize: 12, color: C.muted, italic: Boolean(a.note),
    });
  }

  // B. Agenda
  {
    const s = lightSlide('Agenda', 'How we will use the 45 minutes', 'One problem, looked at in detail. Live screen-share walkthrough. Action summary sent after the call.', footer);
    const blocks = [['0–5 min', 'Introductions & goals'], ['5–15 min', 'Current process'], ['15–35 min', 'Deep-dive & quick wins'], ['35–40 min', 'Estimate & options'], ['40–45 min', 'Next steps']];
    const focus = list(b.agenda_focus, 5);
    const bw = (CW - 4 * 0.2) / 5;
    blocks.forEach(([t, h], i) => {
      const x = X0 + i * (bw + 0.2);
      const hot = i === 2;
      box(s, { x, y: 3.0, w: bw, h: 2.75, fill: { color: hot ? C.lilac : C.card }, line: { color: hot ? C.blue : C.border, width: hot ? 1.5 : 0.75 } });
      text(s, t, { x: x + 0.22, y: 3.22, w: bw - 0.44, h: 0.3, fontSize: 11, bold: hot, color: hot ? C.navy : C.muted });
      text(s, h, { x: x + 0.22, y: 3.6, w: bw - 0.44, h: 0.7, fontSize: 15, bold: true });
      text(s, clip(focus[i], 80), { x: x + 0.22, y: 4.35, w: bw - 0.44, h: 1.3, fontSize: 11, color: hot ? C.navy : C.muted });
    });
    s.addShape(R.roundRect, { x: X0, y: 6.05, w: CW, h: 0.62, rectRadius: 0.12, fill: { color: C.strip }, line: { type: 'none' } });
    text(s, `Success looks like: ${clip(b.call_goal, 150)}`, { x: X0 + 0.3, y: 6.05, w: CW - 0.6, h: 0.62, valign: 'middle', fontSize: 12 });
  }

  // Industry numbers (only when research found sourced stats)
  const stats = list(b.stats, 3).filter((st) => st.figure && st.source);
  if (stats.length) {
    const s = lightSlide('Why it matters', `${a.industry || 'Their industry'}: the numbers`, b.stats_intro, footer);
    const cw = (CW - (stats.length - 1) * 0.25) / stats.length;
    stats.forEach((st, i) => {
      const x = X0 + i * (cw + 0.25);
      box(s, { x, y: 2.95, w: cw, h: 3.0 });
      text(s, clip(st.figure, 12), { x: x + 0.3, y: 3.25, w: cw - 0.6, h: 0.9, fontSize: 40, bold: true, color: C.blue });
      text(s, clip(st.fact, 130), { x: x + 0.3, y: 4.25, w: cw - 0.6, h: 1.1, fontSize: 13 });
      text(s, clip(st.source, 55), { x: x + 0.3, y: 5.45, w: cw - 0.6, h: 0.3, fontSize: 10, color: C.muted });
    });
    s.addShape(R.roundRect, { x: X0, y: 6.15, w: CW, h: 0.55, rectRadius: 0.12, fill: { color: C.strip }, line: { type: 'none' } });
    text(s, 'Sourced by web research at booking time. Check a figure before quoting it to the client.', { x: X0 + 0.3, y: 6.15, w: CW - 0.6, h: 0.55, valign: 'middle', fontSize: 11 });
  }

  // D. Process flow
  {
    const s = lightSlide('How it works today', clip(b.process_title, 60), `${clip(b.process_caption, 140)} (hypothesis, confirm on the call)`, footer);
    const steps = list(b.process_steps, 4);
    const n = steps.length || 1;
    const gap = 0.6;
    const sw = (CW - (n - 1) * gap) / n;
    const hot = Math.min(Math.max(1, Number(b.bottleneck_step) || 1), n) - 1;
    steps.forEach((st, i) => {
      const x = X0 + i * (sw + gap);
      const isHot = i === hot;
      box(s, { x, y: 3.35, w: sw, h: 1.55, fill: { color: isHot ? C.lilac : C.card }, line: { color: isHot ? C.blue : C.border, width: isHot ? 1.5 : 0.75 } });
      text(s, `Step ${i + 1}`, { x, y: 3.55, w: sw, h: 0.25, align: 'center', fontSize: 10, color: isHot ? C.navy : C.muted });
      text(s, clip(st.name, 26), { x: x + 0.15, y: 3.85, w: sw - 0.3, h: 0.5, align: 'center', fontSize: 15, bold: true });
      text(s, clip(st.time, 18), { x, y: 4.4, w: sw, h: 0.3, align: 'center', fontSize: 11, color: isHot ? C.navy : C.muted });
      if (i < n - 1) {
        s.addShape(R.triangle, { x: x + sw + 0.18, y: 3.97, w: 0.26, h: 0.3, rotate: 90, fill: { color: C.blue }, line: { type: 'none' } });
      }
      if (isHot) {
        pillShape(s, { x: x + sw / 2 - 1.1, y: 5.15, w: 2.2, h: 0.42, fill: { color: C.blue } });
        text(s, 'BOTTLENECK', { x: x + sw / 2 - 1.1, y: 5.15, w: 2.2, h: 0.42, align: 'center', valign: 'middle', fontSize: 11, bold: true, color: 'FFFFFF', charSpacing: 1 });
      }
    });
  }

  // C. Quick wins
  {
    const s = lightSlide('Quick wins', 'Quick wins to show live', `Focus: ${clip(b.focus_task, 60)}. The highlighted card is the top priority.`, footer);
    const wins = list(b.quick_wins, 3);
    const cw = (CW - 2 * 0.3) / 3;
    wins.forEach((w, i) => {
      const x = X0 + i * (cw + 0.3);
      const hot = i === 0;
      box(s, { x, y: 3.05, w: cw, h: 3.75, fill: { color: hot ? C.lilac : C.card }, line: { color: hot ? C.blue : C.border, width: hot ? 2 : 0.75 } });
      if (hot) {
        pillShape(s, { x: x + 0.15, y: 2.82, w: 1.4, h: 0.38, fill: { color: C.blue } });
        text(s, 'PRIORITY', { x: x + 0.15, y: 2.82, w: 1.4, h: 0.38, align: 'center', valign: 'middle', fontSize: 9, bold: true, color: 'FFFFFF', charSpacing: 1 });
      }
      s.addShape(R.roundRect, { x: x + 0.25, y: 3.32, w: 0.5, h: 0.5, rectRadius: 0.1, fill: { color: hot ? 'FFFFFF' : C.iconBg }, line: { type: 'none' } });
      text(s, String(i + 1), { x: x + 0.25, y: 3.32, w: 0.5, h: 0.5, align: 'center', valign: 'middle', fontSize: 14, bold: true, color: C.blue });
      text(s, clip(w.tools, 24), { x: x + 0.9, y: 3.42, w: cw - 1.15, h: 0.3, align: 'right', fontSize: 10, color: hot ? C.navy : C.muted });
      text(s, clip(w.heading, 40), { x: x + 0.25, y: 4.0, w: cw - 0.5, h: 0.65, fontSize: 15, bold: true });
      dotList(s, list(w.points, 3).map((p) => clip(p, 50)), x + 0.25, 4.75, cw - 0.5, { size: 11, gap: 0.42 });
      text(s, clip(w.saves, 30), { x: x + 0.25, y: 6.3, w: cw - 0.5, h: 0.3, fontSize: 11, bold: true, color: C.blue });
    });
  }

  // F. Priority matrix
  {
    const s = lightSlide('Prioritisation', 'What to tackle first', 'Opportunities beyond the focus task, by impact and effort. Use these to show the bigger picture.', footer);
    const items = list(b.matrix, 6);
    const gx = 1.45; const gy = 2.95; const qw = 2.9; const qh = 1.75;
    const quads = { do_first: [0, 0, 'Do first'], quick_fill_in: [1, 0, 'Quick fill-in'], plan_next: [0, 1, 'Plan next'], park: [1, 1, 'Park for now'] };
    s.addShape(R.roundRect, { x: gx - 0.05, y: gy - 0.05, w: qw * 2 + 0.1, h: qh * 2 + 0.1, rectRadius: 0.12, fill: { color: C.card }, line: { color: C.border, width: 0.75 } });
    Object.entries(quads).forEach(([key, [cx, cy, label]]) => {
      const x = gx + cx * qw; const y = gy + cy * qh;
      if (key === 'do_first') s.addShape(R.roundRect, { x: x + 0.04, y: y + 0.04, w: qw - 0.08, h: qh - 0.08, rectRadius: 0.1, fill: { color: C.lilac }, line: { type: 'none' } });
      text(s, label, { x, y: y + qh / 2 - 0.15, w: qw, h: 0.3, align: 'center', fontSize: 12, bold: key === 'do_first', color: key === 'do_first' ? C.navy : C.muted });
      items.map((it, idx) => ({ it, idx })).filter(({ it }) => it.quadrant === key).forEach(({ idx }, k) => {
        s.addShape(R.ellipse, { x: x + 0.2 + k * 0.5, y: y + 0.2, w: 0.38, h: 0.38, fill: { color: C.blue }, line: { type: 'none' } });
        text(s, String(idx + 1), { x: x + 0.2 + k * 0.5, y: y + 0.2, w: 0.38, h: 0.38, align: 'center', valign: 'middle', fontSize: 11, bold: true, color: 'FFFFFF' });
      });
    });
    s.addShape(R.line, { x: gx + qw, y: gy, w: 0, h: qh * 2, line: { color: C.border, width: 1 } });
    s.addShape(R.line, { x: gx, y: gy + qh, w: qw * 2, h: 0, line: { color: C.border, width: 1 } });
    text(s, 'IMPACT ↑', { x: 0.35, y: gy + qh - 0.15, w: 1.0, h: 0.3, fontSize: 9, bold: true, color: C.label, align: 'center' });
    text(s, 'EFFORT →', { x: gx, y: gy + qh * 2 + 0.12, w: qw * 2, h: 0.3, fontSize: 9, bold: true, color: C.label, align: 'center' });
    const lx = gx + qw * 2 + 0.55; const lw = W - X0 - lx;
    items.forEach((it, i) => {
      const y = gy + i * 0.58;
      s.addShape(R.ellipse, { x: lx, y, w: 0.38, h: 0.38, fill: { color: C.blue }, line: { type: 'none' } });
      text(s, String(i + 1), { x: lx, y, w: 0.38, h: 0.38, align: 'center', valign: 'middle', fontSize: 11, bold: true, color: 'FFFFFF' });
      text(s, clip(it.name, 46), { x: lx + 0.55, y, w: lw - 0.55, h: 0.38, valign: 'middle', fontSize: 13 });
    });
  }

  // E. Discovery questions
  {
    const s = lightSlide('Questions to ask', 'Discovery questions', 'Ask in this order. Most belong in the 5–15 minute "current process" block.', footer);
    const rows = list(b.discovery_questions, 6).map((q, i) => [String(i + 1), clip(q.question, 95), clip(q.why, 75)]);
    table(s, ['#', 'Question', 'What it tells you'], rows, [0.55, 6.9, CW - 7.45], 2.9);
  }

  // G. Estimate
  {
    const s = lightSlide('Rough estimate', 'What it could be worth', `Recommended route: ${b.recommended_package}. Use in the 35–40 minute block.`, footer);
    const cards = [['Time saved', b.estimate?.time_saved], ['Cost to build', b.estimate?.cost_to_build], ['Payback', b.estimate?.payback]];
    const cw = (CW - 2 * 0.3) / 3;
    cards.forEach(([k, v], i) => {
      const x = X0 + i * (cw + 0.3);
      box(s, { x, y: 2.95, w: cw, h: 2.55 });
      text(s, k.toUpperCase(), { x: x + 0.3, y: 3.2, w: cw - 0.6, h: 0.3, fontSize: 10, bold: true, color: C.label, charSpacing: 1 });
      text(s, clip(v || 'TBC', 16), { x: x + 0.3, y: 3.75, w: cw - 0.6, h: 0.9, fontSize: 32, bold: true });
      text(s, 'range, not a promise', { x: x + 0.3, y: 4.85, w: cw - 0.6, h: 0.3, fontSize: 10, color: C.muted });
    });
    s.addShape(R.roundRect, { x: X0, y: 5.8, w: CW, h: 0.95, rectRadius: 0.12, fill: { color: C.strip }, line: { type: 'none' } });
    text(s, `Assumptions: ${clip(b.estimate?.assumptions, 210)} Rough estimate only. Not a quote or a guarantee.`, {
      x: X0 + 0.3, y: 5.8, w: CW - 0.6, h: 0.95, valign: 'middle', fontSize: 11,
    });
  }

  // Recommended package (cards, recommended one highlighted)
  {
    const s = lightSlide('Recommendation', `Recommended: ${b.recommended_package}`, b.package_rationale, footer);
    const cw = (CW - 3 * 0.25) / 4;
    PACKAGES.forEach((p, i) => {
      const x = X0 + i * (cw + 0.25);
      const hot = p.name === b.recommended_package;
      box(s, { x, y: 3.05, w: cw, h: 3.7, fill: { color: hot ? C.lilac : C.card }, line: { color: hot ? C.blue : C.border, width: hot ? 2 : 0.75 } });
      if (hot) {
        pillShape(s, { x: x + 0.15, y: 2.82, w: 1.75, h: 0.38, fill: { color: C.blue } });
        text(s, 'RECOMMENDED', { x: x + 0.15, y: 2.82, w: 1.75, h: 0.38, align: 'center', valign: 'middle', fontSize: 9, bold: true, color: 'FFFFFF', charSpacing: 1 });
      }
      text(s, p.name, { x: x + 0.25, y: 3.4, w: cw - 0.5, h: 0.6, fontSize: 15, bold: true });
      text(s, p.price, { x: x + 0.25, y: 4.0, w: cw - 0.5, h: 0.5, fontSize: 24, bold: true, color: hot ? C.navy : C.blue });
      text(s, `+ ${p.retainer} monthly retainer`, { x: x + 0.25, y: 4.5, w: cw - 0.5, h: 0.3, fontSize: 10, color: hot ? C.navy : C.muted });
      dotList(s, p.points, x + 0.25, 5.05, cw - 0.5, { size: 10.5, gap: 0.4 });
    });
  }

  // E. Objections
  {
    const s = lightSlide('Be ready for', 'Likely objections and watch-outs', 'Keep answers short and bring it back to the numbers on the estimate slide.', footer);
    const rows = list(b.objections, 4).map((o) => [clip(o.objection, 75), clip(o.response, 125)]);
    table(s, ['Objection', 'How to respond'], rows, [4.6, CW - 4.6], 2.9);
  }

  // H. Next steps
  {
    const s = darkSlide();
    text(s, 'NEXT STEPS', { x: X0, y: 1.2, w: 6, h: 0.3, fontSize: 12, bold: true, color: C.onDarkMuted, charSpacing: 1 });
    text(s, 'Action summary', { x: X0, y: 1.65, w: 9, h: 0.7, fontSize: 30, bold: true, color: 'FFFFFF' });
    list(b.next_steps, 3).forEach((st, i) => {
      const y = 2.85 + i * 0.95;
      s.addShape(R.roundRect, { x: X0, y, w: 8.6, h: 0.72, rectRadius: 0.12, fill: { color: C.pill }, line: { type: 'none' } });
      text(s, `${i + 1}.   ${clip(st.action, 64)}   |   ${clip(st.owner, 22)}   |   ${clip(st.when, 22)}`, {
        x: X0 + 0.3, y, w: 8.0, h: 0.72, valign: 'middle', fontSize: 13, color: 'FFFFFF',
      });
    });
    text(s, 'Send the written action summary after the call, as promised on the booking page.', { x: X0, y: 5.9, w: 8.6, h: 0.3, fontSize: 11, color: C.onDarkMuted });
    logoCircle(s, 11.25, 5.85, 1.05);
  }

  return pptx.write({ outputType: 'nodebuffer' });
}
