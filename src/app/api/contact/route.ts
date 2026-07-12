import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send the email using Resend's testing domain
    const { error } = await resend.emails.send({
      // Use onboarding@resend.dev for testing. 
      // Once you verify smartcurrencytools.com in Resend, change this to contact@smartcurrencytools.com
      from: 'SmartCurrencyTools <onboarding@resend.dev>',
      to: ['stoicbonding@gmail.com'], // Sending directly to your email for testing
      replyTo: email, // If you hit reply, it will go to the user who filled the form
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