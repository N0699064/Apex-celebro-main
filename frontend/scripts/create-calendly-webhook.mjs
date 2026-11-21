// One-off: subscribes the Netlify function to Calendly's "invitee.created" event.
//
//   CALENDLY_TOKEN=<personal access token> node scripts/create-calendly-webhook.mjs https://apexcerebro.co.uk
//
// Prints a signing key. Save it in Netlify as CALENDLY_WEBHOOK_SIGNING_KEY, then redeploy.
// Calendly webhooks need a paid Calendly plan (Standard or above).
import crypto from 'node:crypto';

const token = process.env.CALENDLY_TOKEN;
const site = (process.argv[2] || '').replace(/\/$/, '');
if (!token || !site) {
  console.error('Usage: CALENDLY_TOKEN=... node scripts/create-calendly-webhook.mjs https://your-site');
  process.exit(1);
}

const api = async (path, init = {}) => {
  const res = await fetch(`https://api.calendly.com${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(json)}`);
  return json;
};

const { resource: me } = await api('/users/me');
const signingKey = crypto.randomBytes(32).toString('hex');

const { resource: sub } = await api('/webhook_subscriptions', {
  method: 'POST',
  body: JSON.stringify({
    url: `${site}/.netlify/functions/calendly-booking-background`,
    events: ['invitee.created'],
    organization: me.current_organization,
    user: me.uri,
    scope: 'user',
    signing_key: signingKey,
  }),
});

console.log('Webhook created:', sub.uri);
console.log('\nSet this in Netlify (Site configuration > Environment variables):');
console.log(`CALENDLY_WEBHOOK_SIGNING_KEY=${signingKey}`);
