import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { db } from './db';
import { randomUUID } from 'crypto';

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-min-32-chars-long!!!'
);

interface AdminMapping {
  adminEmail: string;
  actualEmail: string;
}

export function isAdminEmail(email: string): AdminMapping | null {
  if (email.includes('+admin@aganitha.ai')) {
    const actualEmail = email.replace('+admin', '');
    return {
      adminEmail: email,
      actualEmail: actualEmail
    };
  }
  return null;
}

// export async function createSession(userId: string, requestInfo?: {
//   userAgent?: string;
//   ip?: string;
// }) {
//   const token = await new SignJWT({ userId })
//     .setProtectedHeader({ alg: 'HS256' })
//     .setExpirationTime('7d')
//     .setIssuedAt()
//     .sign(secret);

//   cookies().set('session', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     maxAge: 7 * 24 * 60 * 60, // 7 days
//   });

//   if (requestInfo?.userAgent) {
//     const { device, browser } = parseUserAgent(requestInfo.userAgent);
//     await storeSession(userId, {
//       device: `${browser} on ${device}`,
//       browser: `${browser}`,
//       ip_address: requestInfo.ip || 'Unknown',
//       location: 'Unknown'
//     });
//   }

//   return token;
// }

// lib/auth.ts

export async function createSession(userId: string, requestInfo?: {
  userAgent?: string;
  ip?: string;
}) {
  // Get user's admin status from database
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?')
    .get(userId) as { is_admin: number };

  const token = await new SignJWT({ 
    userId,
    isAdmin: user.is_admin === 1 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(secret);

  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  if (requestInfo?.userAgent) {
    const { device, browser } = parseUserAgent(requestInfo.userAgent);
    await storeSession(userId, {
      device: `${browser} on ${device}`,
      browser: `${browser}`,
      ip_address: requestInfo.ip || 'Unknown',
      location: 'Unknown'
    });
  }

  return token;
}
export async function getSession() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('session')?.value;
    if (!token) return null;

    const verified = await jwtVerify(token, secret);
    return verified.payload as { userId: string };
  } catch {
    return null;
  }
}

export async function generateOTP(email: string) {
  const adminMapping = isAdminEmail(email);
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const userId = randomUUID();
  
  // If it's an admin email, use the actual email for user creation but mark as admin
  const userEmail = adminMapping?.actualEmail || email;
  
  const stmt = db.prepare(`
    INSERT INTO users (id, email, is_admin)
    VALUES (?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET
    email = excluded.email,
    is_admin = excluded.is_admin
    RETURNING id
  `);
  
  const user = stmt.get(userId, userEmail, adminMapping ? 1 : 0) as { id: string };
  
  db.prepare(`
    INSERT INTO otp_codes (id, user_id, code, expires_at)
    VALUES (?, ?, ?, datetime('now', '+10 minutes'))
  `).run(randomUUID(), user.id, code);

  return { 
    code, 
    userId: user.id,
    sendToEmail: adminMapping ? adminMapping.actualEmail : email 
  };
}

export function verifyOTP(userId: string, code: string) {
  const result = db.prepare(`
    SELECT * FROM otp_codes
    WHERE user_id = ?
    AND code = ?
    AND expires_at > datetime('now')
    AND used = FALSE
    LIMIT 1
  `).get(userId, code) as { id: string } | undefined;

  if (result) {
    db.prepare(`
      UPDATE otp_codes
      SET used = TRUE
      WHERE id = ?
    `).run(result.id);
    return true;
  }

  return false;
}

export function isEmailAllowed(email: string) {
  const adminMapping = isAdminEmail(email);
  if (adminMapping) {
    return adminMapping.actualEmail.endsWith('@aganitha.ai');
  }
  return email.endsWith('@gmail.com') || email.endsWith('@aganitha.ai');
}

export async function storeSession(userId: string, sessionInfo: {
  device: string;
  browser: string;
  location: string;
  ip_address: string;
}) {
  const sessionId = randomUUID();
  
  db.prepare(`
    INSERT INTO user_sessions (
      id,
      user_id,
      device,
      browser,
      location,
      ip_address
    ) VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    sessionId,
    userId,
    sessionInfo.device,
    sessionInfo.browser,
    sessionInfo.location,
    sessionInfo.ip_address
  );

  return sessionId;
}

export function parseUserAgent(userAgent: string) {
  const device = userAgent.includes('Mobile') 
    ? 'Mobile Device'
    : userAgent.includes('Windows')
    ? 'Windows PC'
    : userAgent.includes('Mac')
    ? 'MacOS'
    : userAgent.includes('Linux')
    ? 'Linux'
    : 'Unknown Device';

  const browser = userAgent.includes('Chrome')
    ? 'Chrome'
    : userAgent.includes('Firefox')
    ? 'Firefox'
    : userAgent.includes('Safari')
    ? 'Safari'
    : userAgent.includes('Edge')
    ? 'Edge'
    : 'Unknown Browser';

  return { device, browser };
}

export function getUserSessions(userId: string) {
  return db.prepare(`
    SELECT 
      device,
      browser,
      location,
      ip_address,
      timestamp
    FROM user_sessions
    WHERE user_id = ?
    ORDER BY timestamp DESC
    LIMIT 5
  `).all(userId) as {
    device: string;
    browser: string;
    location: string;
    ip_address: string;
    timestamp: string;
  }[];
}

export function logAdminAction(adminId: string, actionType: string, actionDetails: string) {
  db.prepare(`
    INSERT INTO admin_actions (
      id,
      admin_id,
      action_type,
      action_details
    ) VALUES (?, ?, ?, ?)
  `).run(randomUUID(), adminId, actionType, actionDetails);
}

export async function isUserAdmin(userId: string): Promise<boolean> {
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?')
    .get(userId) as { is_admin: number } | undefined;
  
  return user?.is_admin === 1;
}

