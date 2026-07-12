import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message, company_name } = await req.json();

    // Honeypot check: if this hidden field is filled out, it's a bot. Pretend it succeeded.
    if (company_name) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send the email to yourself (or your support team)
    // NOTE: Make sure you have verified smartcurrencytools.com in your Resend dashboard!
    const { error } = await resend.emails.send({
      from: 'SmartCurrencyTools <contact@smartcurrencytools.com>',
      to: ['support@smartcurrencytools.com'], // CHANGE THIS to your actual receiving email address
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
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}