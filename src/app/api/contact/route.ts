import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { name, email, message, company_name } = await req.json();

    // Honeypot check
    if (company_name) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('[AI Studio] RESEND_API_KEY not configured. Mocking contact message submission.');
      return NextResponse.json({ success: true, message: 'Message received (demo mode - RESEND_API_KEY not set).' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send the email using Resend
    const { error } = await resend.emails.send({
      from: 'SmartCurrencyTools <onboarding@resend.dev>',
      to: ['stoicbonding@gmail.com'],
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}