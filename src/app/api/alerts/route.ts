import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, from, to, target } = await req.json();
  // In production, save this to your database (Postgres/Supabase).
  console.log(`Alert set for ${email}: ${from}/${to} at ${target}`);
  return NextResponse.json({ success: true });
}