// app/(protected)/profile/ProfileData.tsx
import { getSession, getUserSessions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function getProfileData() {
  const session = await getSession();
  
  if (!session) {
    return null;
  }

  const baseUser = db.prepare('SELECT * FROM users WHERE id = ?')
    .get(session.userId) as { email: string; created_at: string; };

  if (!baseUser) {
    return null;
  }

  const userSessions = getUserSessions(session.userId);
  const userPreferences = db.prepare(`
    SELECT * FROM user_preferences WHERE user_id = ?
  `).get(session.userId) as {
    phone: string;
    working_hours: string;
    time_zone: string;
    preferred_tools: string;
    updated_at: string;
  } | undefined;

  return {
    user: baseUser,
    sessions: userSessions,
    preferences: userPreferences
  };
}