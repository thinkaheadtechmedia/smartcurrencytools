import { NextResponse } from 'next/server';
import { queryDb } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, from, to, target, direction } = await req.json();

    if (!email || !from || !to || !target || !direction) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const query = `
      INSERT INTO rate_alerts (email, from_currency, to_currency, target_rate, direction)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [email, from, to, target, direction];

    await queryDb(query, values);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Failed to save alert:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}