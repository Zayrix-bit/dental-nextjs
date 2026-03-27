import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    const { firstName, lastName, email, phone, service, date, message } = data;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !service || !date) {
      return NextResponse.json(
        { error: 'All required fields must be provided.' },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Send an email (nodemailer, resend, etc.)
    // 2. Store in a database
    // 3. Send to a CRM
    // For now, we log and return success
    console.log('📋 New Appointment Request:', {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      service,
      date,
      message: message || 'N/A',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Appointment request received successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
