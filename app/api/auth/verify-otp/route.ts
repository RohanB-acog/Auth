import { NextResponse } from 'next/server';
import { verifyOTP, createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { userId, otp } = await request.json();

    if (!userId || !otp) {
      return NextResponse.json(
        { error: 'User ID and OTP are required' },
        { status: 400 }
      );
    }

    const isValid = verifyOTP(userId, otp);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Get request headers for session tracking
    const headers = new Headers(request.headers);
    await createSession(userId, {
      userAgent: headers.get('user-agent') || undefined,
      ip: headers.get('x-forwarded-for') || undefined
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('OTP Verification Error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}