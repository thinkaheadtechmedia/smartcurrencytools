import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    const { email, from, to, target, direction } = await req.json();

    if (!email || !from || !to || !target || !direction) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sql`
      INSERT INTO rate_alerts (email, from_currency, to_currency, target_rate, direction)
      VALUES (${email}, ${from}, ${to}, ${target}, ${direction})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save alert:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}