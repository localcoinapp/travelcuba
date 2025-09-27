// functions/contact.js (Netlify-style) or api/contact.js for Vercel
const fetch = globalThis.fetch || require('node-fetch');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const CONTACT_TABLE = process.env.CONTACT_TABLE || 'cuba_contacts';

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function verifyRecaptcha(token, remoteip) {
  const params = new URLSearchParams();
  params.append('secret', RECAPTCHA_SECRET_KEY);
  params.append('response', token);
  if (remoteip) params.append('remoteip', remoteip);

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  return res.json();
}

exports.handler = async function (event, context) {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    const body = JSON.parse(event.body || '{}');
    const { name, email, business, message, recaptcha_token } = body;

    if (!name || !email || !message || !recaptcha_token) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
    }

    // Verify reCAPTCHA
    const verification = await verifyRecaptcha(recaptcha_token, event.headers['client-ip'] || event.headers['x-forwarded-for']);
    if (!verification || verification.success !== true) {
      return { statusCode: 400, body: JSON.stringify({ error: 'reCAPTCHA failed', details: verification }) };
    }
    // Optional score check for v3
    if (typeof verification.score === 'number' && verification.score < 0.45) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Low reCAPTCHA score', score: verification.score }) };
    }

    // Insert into Supabase (server-side using service key)
    const { data, error } = await supabaseAdmin
      .from(CONTACT_TABLE)
      .insert([{ name, email, business: business || null, message }]);

    if (error) {
      console.error('Supabase insert error', error);
      return { statusCode: 502, body: JSON.stringify({ error: 'DB insert failed' }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, data }) };
  } catch (err) {
    console.error('contact handler error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
