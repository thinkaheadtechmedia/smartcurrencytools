import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Send via Resend in production
  console.log(`Contact from ${name} (${email}): ${message}`);
  
  return NextResponse.json({ success: true });
}