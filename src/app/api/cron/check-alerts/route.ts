import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  // 1. Verify authorization to prevent external abuse
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 2. Fetch all un-triggered alerts
    const { rows: alerts } = await sql`SELECT * FROM rate_alerts WHERE is_triggered = FALSE`;
    
    if (alerts.length === 0) {
      return NextResponse.json({ message: 'No alerts to check.' });
    }

    // 3. Check rates and send emails
    for (const alert of alerts) {
      // Fetch live rate
      const res = await fetch(`https://open.er-api.com/v6/latest/${alert.from_currency}`);
      const data = await res.json();
      const currentRate = data.rates[alert.to_currency];

      if (!currentRate) continue;

      let shouldTrigger = false;
      if (alert.direction === 'above' && currentRate >= parseFloat(alert.target_rate)) {
        shouldTrigger = true;
      } else if (alert.direction === 'below' && currentRate <= parseFloat(alert.target_rate)) {
        shouldTrigger = true;
      }

      // 4. Send Email and mark as triggered
      if (shouldTrigger) {
        try {
          await resend.emails.send({
            from: 'SmartCurrencyTools <alerts@smartcurrencytools.com>',
            to: alert.email,
            subject: `Rate Alert Triggered: ${alert.from_currency}/${alert.to_currency}`,
            html: `
              <h2>Your Rate Alert Was Triggered!</h2>
              <p>Good news! The exchange rate for <strong>${alert.from_currency} to ${alert.to_currency}</strong> has crossed your target of <strong>${alert.target_rate}</strong>.</p>
              <p>Current Rate: <strong>${currentRate.toFixed(4)}</strong></p>
              <p><a href="https://smartcurrencytools.com/convert/${alert.from_currency}-to-${alert.to_currency}">View Live Chart & Convert →</a></p>
              <br>
              <p style="color: #666; font-size: 12px;">This was a one-time alert. You will not be notified again for this threshold. <a href="https://smartcurrencytools.com/rate-alerts">Set a new alert here.</a></p>
            `
          });

          // Mark as triggered so we don't spam them
          await sql`UPDATE rate_alerts SET is_triggered = TRUE WHERE id = ${alert.id}`;
          console.log(`Alert triggered and email sent to ${alert.email}`);
        } catch (emailError) {
          console.error(`Failed to send email to ${alert.email}:`, emailError);
        }
      }
    }

    return NextResponse.json({ success: true, checked: alerts.length });
  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 });
  }
}