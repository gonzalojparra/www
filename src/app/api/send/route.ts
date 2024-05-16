import { Resend } from 'resend';
import { NextResponse } from 'next/server';

import { ContactEmailTemplate } from '@/components/contact-email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { firstName, lastName, email, message } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gonzzaparra@gmail.com',
      subject: 'Message from contact form',
      react: ContactEmailTemplate({
        firstName,
        lastName,
        email,
        message
      })
    });

    if (error) {
      return NextResponse.json({
        status: 500,
        body: { message: 'Error sending email' }
      });
    }

    return NextResponse.json({
      status: 200,
      body: { message: data }
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { message: error }
    });
  }
}