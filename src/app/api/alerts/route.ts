import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL is missing in Vercel' }, { status: 500 });
    }

    // Initialize the standard Postgres connection pool
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    const { email, from, to, target, direction } = await req.json();

    if (!email || !from || !to || !target || !direction) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const query = `
      INSERT INTO rate_alerts (email, from_currency, to_currency, target_rate, direction)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [email, from, to, target, direction];

    await pool.query(query, values);
    await pool.end(); // Close the connection after the request

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to save alert:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}