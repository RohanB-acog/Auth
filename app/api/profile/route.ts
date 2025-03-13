import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const user = db.prepare('SELECT * FROM users WHERE id = ?')
      .get(session.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const sessions = db.prepare(`
      SELECT device, browser, location, ip_address, timestamp
      FROM user_sessions
      WHERE user_id = ?
      ORDER BY timestamp DESC
      LIMIT 5
    `).all(session.userId);

    const preferences = db.prepare(`
      SELECT phone, working_hours, time_zone, preferred_tools, updated_at
      FROM user_preferences
      WHERE user_id = ?
    `).get(session.userId);

    return NextResponse.json({
      user,
      sessions,
      preferences
    });
  } catch (error) {
    console.error('Profile Fetch Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Validate the data
    if (!data.phone || !data.workingHours || !data.timeZone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert preferred tools array to string
    const preferredTools = Array.isArray(data.preferredTools) 
      ? data.preferredTools.join(',')
      : '';

    // Update or insert user preferences
    db.prepare(`
      INSERT INTO user_preferences (
        id,
        user_id,
        phone,
        working_hours,
        time_zone,
        preferred_tools,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(user_id) DO UPDATE SET
        phone = excluded.phone,
        working_hours = excluded.working_hours,
        time_zone = excluded.time_zone,
        preferred_tools = excluded.preferred_tools,
        updated_at = datetime('now')
    `).run(
      randomUUID(),
      session.userId,
      data.phone,
      data.workingHours,
      data.timeZone,
      preferredTools
    );
    
    return NextResponse.json({ 
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Profile Update Error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}