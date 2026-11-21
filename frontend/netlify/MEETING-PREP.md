# Meeting-prep decks

When someone books **and pays** for the **45-Minute Consultation** through the site's booking funnel, Calendly sends a webhook to `functions/calendly-booking-background.mjs`. That function:

1. checks the Calendly signature, that the booking is paid, and that it is the 45-minute session (90-minute bookings are skipped),
2. has Claude search the web for real, sourced stats about the prospect's industry and time drains (`lib/briefing.mjs`, `research`),
3. has Claude write the slide content from their answers plus that research (`lib/briefing.mjs`, `writeBriefing`),
4. draws the deck in the Apex Cerebro slide style (`lib/deck.mjs`),
5. emails the `.pptx` to you through Resend.

If anything in steps 2 to 4 fails, you still get the email with their answers, marked `[No deck]`.

## The deck (12 slides max)

1. **Title** (dark gradient): company, 45-Minute Consultation, date, presenter, contact, amount paid
2. **Client snapshot**: industry, team size, admin hours, timeline, time drains, focus for the call, their own note
3. **Agenda**: the 45 minutes in fixed blocks (0–5 intro & goals, 5–15 current process, **15–35 deep-dive & quick wins**, 35–40 estimate & options, 40–45 next steps), each with a tailored focus line, plus what success looks like
4. **Why it matters**: up to 3 industry stats with sources (only appears if the research found sourced figures)
5. **How it works today**: the likely 4-step process with the bottleneck highlighted
6. **Quick wins**: 3 cards to show live, top priority highlighted
7. **Prioritisation**: numbered impact / effort matrix
8. **Discovery questions**: table of 6 questions and what each tells you
9. **Rough estimate**: time saved, cost to build, payback, with assumptions
10. **Recommendation**: the four packages with the recommended one highlighted
11. **Objections**: table of likely objections and responses
12. **Next steps** (dark gradient): 3 actions with owner and timing

To change the agenda blocks or the slide wording, edit `lib/deck.mjs` (agenda times) and the `SYSTEM` prompt in `lib/briefing.mjs`, which explains the session format to Claude. Package names and prices live in `lib/packages.mjs` and must match `src/components/apex/Pricing.jsx`.

## Setup (once)

1. **Resend:** create an account at resend.com, verify the `apexcerebro.co.uk` domain and create an API key.
2. **Anthropic:** create an API key at console.anthropic.com. Each deck costs well under £1 (two Claude calls plus a few web searches).
3. **Netlify environment variables** (Site configuration > Environment variables):

   | Name | Value |
   |---|---|
   | `ANTHROPIC_API_KEY` | your Anthropic key |
   | `RESEND_API_KEY` | your Resend key |
   | `MEETING_PREP_TO` | optional: where decks go (default `ceo@apexcerebro.co.uk`; comma-separate for several) |
   | `MEETING_PREP_FROM` | e.g. `Apex Cerebro <bookings@apexcerebro.co.uk>` (must be on the verified domain) |
   | `CALENDLY_WEBHOOK_SIGNING_KEY` | printed by step 5 |
   | `MEETING_PREP_PRESENTER` | optional: name on the title slide (default "Apex Cerebro") |
   | `MEETING_PREP_FONT` | optional: deck font (default "Segoe UI"; use "Manrope" only if it is installed where you open decks) |

4. Deploy, so the function exists.
5. **Calendly webhook:** create a personal access token in Calendly (Integrations > API & Webhooks), then from `frontend/` run:

   ```
   CALENDLY_TOKEN=... node scripts/create-calendly-webhook.mjs https://apexcerebro.co.uk
   ```

   Put the signing key it prints into Netlify as `CALENDLY_WEBHOOK_SIGNING_KEY` and redeploy.

Requirements: Calendly webhooks need a paid Calendly plan, and the function runs as a Netlify background function, so check your Netlify plan includes background functions.

## How the 45-minute session is recognised

A booking counts as the 45-Minute Consultation if the Calendly slot is 45 minutes long, the Calendly event name contains "45", or the payment was £120. If you change the price or event, update `is45MinuteSession` in the function.
