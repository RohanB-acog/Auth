import { NextResponse } from 'next/server';
import { generateOTP, isEmailAllowed } from '@/lib/auth';
import { sendOTPEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!isEmailAllowed(email)) {
      return NextResponse.json(
        { error: 'Email not authorized' },
        { status: 403 }
      );
    }

    const { code, userId } = await generateOTP(email);
    await sendOTPEmail(email, code);

    return NextResponse.json({ userId });
  } catch (error) {
    console.error('OTP Request Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}