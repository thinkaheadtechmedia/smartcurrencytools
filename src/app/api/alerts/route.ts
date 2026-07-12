import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const sql = neon(process.env.DATABASE_URL);
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