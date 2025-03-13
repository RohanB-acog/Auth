// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';
import { getSession, isUserAdmin } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const isAdmin = await isUserAdmin(session.userId);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }

    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users WHERE is_admin = 0')
      .get() as { count: number };
      
    const totalDepartments = db.prepare('SELECT COUNT(*) as count FROM departments')
      .get() as { count: number };
      
    const recentActions = db.prepare(`
      SELECT 
        a.action_type,
        a.action_details,
        a.performed_at,
        u.email as admin_email
      FROM admin_actions a
      JOIN users u ON a.admin_id = u.id
      ORDER BY a.performed_at DESC
      LIMIT 5
    `).all();

    return NextResponse.json({
      totalUsers: totalUsers.count,
      totalDepartments: totalDepartments.count,
      recentActions
    });
  } catch (error) {
    console.error('Admin Stats Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}