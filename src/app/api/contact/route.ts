import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Create a transporter using SMTP settings from environment variables.
    // For Gmail, use an "App Password" rather than your normal password.
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can also use host/port directly
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'muhammadarshad5440@gmail.com', // The user's specified recipient
      replyTo: email,
      subject: `[Contact Form] ${subject || 'New Message from Wingstop Calculator'}`,
      text: `You have received a new message from the Wingstop Calculator Contact Form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #006938;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    // Note: If SMTP variables are missing, we still return success in development to test UI
    // but log a warning.
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('SMTP_USER or SMTP_PASS is missing in .env. Email was not actually sent.');
      return NextResponse.json({ success: true, warning: 'SMTP not configured' }, { status: 200 });
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send the message. Please try again later.' },
      { status: 500 }
    );
  }
}
