function asArray(value) {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string' && value.trim()) return [value];
  return [];
}

function sanitizeText(value, maxLen = 500) {
  if (value == null) return '';
  return String(value).replace(/[\r\n\t]+/g, ' ').slice(0, maxLen);
}

async function postJson(url, body, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      text,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(req, res) {
  console.log('[API] Request received:', req.method, req.url);
  
  if (req.method !== 'POST') {
    console.error('[API] Method not allowed:', req.method);
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const webhookUrl = process.env.GSHEETS_WEBHOOK_URL;
  console.log('[API] GSHEETS_WEBHOOK_URL present:', !!webhookUrl);
  console.log('[API] Webhook URL:', webhookUrl);

  if (!webhookUrl) {
    console.error('[API] Missing GSHEETS_WEBHOOK_URL environment variable');
    res.status(500).json({
      ok: false,
      error: 'Server is missing GSHEETS_WEBHOOK_URL',
    });
    return;
  }

  let payload;
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    console.log('[API] Parsed request body:', payload);
  } catch (parseErr) {
    console.error('[API] Failed to parse JSON:', parseErr);
    res.status(400).json({ ok: false, error: 'Invalid JSON' });
    return;
  }

  const date = sanitizeText(payload?.date, 50);
  const food = asArray(payload?.food);
  const dessert = asArray(payload?.dessert);
  const activities = asArray(payload?.activities);
  const sessionId = sanitizeText(payload?.sessionId, 80);

  const nowIso = new Date().toISOString();

  const submission = {
    time: nowIso,
    sessionId,
    date,
    food,
    dessert,
    activities,
    userAgent: sanitizeText(req.headers['user-agent'], 200),
  };
  
  console.log('[API] Submission object:', submission);

  try {
    console.log('[API] POSTing to Google Sheets webhook:', webhookUrl);
    const result = await postJson(webhookUrl, submission);
    console.log('[API] Webhook response:', { ok: result.ok, status: result.status, text: result.text.substring(0, 200) });
    
    if (!result.ok) {
      console.error('[API] Google Sheet webhook returned error:', result.status, result.text);
      res.status(502).json({
        ok: false,
        error: 'Failed to write to Google Sheet',
        detail: sanitizeText(result.text || `HTTP ${result.status}`, 500),
      });
      return;
    }

    console.log('[API] ✅ Successfully wrote to Google Sheet');
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[API] Exception while calling webhook:', err);
    res.status(500).json({
      ok: false,
      error: 'Failed to write to Google Sheet',
      detail: sanitizeText(err?.message || err, 300),
    });
  }
}
