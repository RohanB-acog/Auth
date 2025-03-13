// app/api/admin/check/route.ts
import { NextResponse } from 'next/server';
import { getSession, isUserAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ isAdmin: false });
    }

    const admin = await isUserAdmin(session.userId);
    return NextResponse.json({ isAdmin: admin });
  } catch (error) {
    console.error('Admin check error:', error);
    return NextResponse.json({ isAdmin: false });
  }
}