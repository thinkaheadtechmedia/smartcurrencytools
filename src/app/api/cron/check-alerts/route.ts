import { NextResponse } from 'next/server';
import { fetchLatestRates } from '@/lib/api';

// Vercel Cron runs this daily. Add to vercel.json:
// { "crons": [{ "path": "/api/cron/check-alerts", "schedule": "0 8 * * *" }] }
export async function GET(req: Request) {
  // 1. Verify authorization header to prevent external abuse
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 2. Fetch alerts from DB (mocked here)
  const mockAlerts = [{ email: 'user@test.com', from: 'USD', to: 'EUR', target: 0.95 }];

  // 3. Check rates and send emails
  for (const alert of mockAlerts) {
    const data = await fetchLatestRates(alert.from, alert.to);
    if (!data?.rates) {
      continue;
    }

    const currentRate = data.rates[alert.to];
    if (currentRate === undefined) {
      continue;
    }

    if (currentRate >= alert.target) {
      // Import and send via Resend
      // const { Resend } = await import('resend');
      // const resend = new Resend(process.env.RESEND_API_KEY);
      // await resend.emails.send({ from: 'alerts@smartcurrencytools.com', to: alert.email, subject: 'Rate Alert Triggered!', html: `...` });
      console.log(`Triggered alert for ${alert.email}`);
    }
  }

  return NextResponse.json({ success: true });
}