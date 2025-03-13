import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { db } from '@/lib/db';
import { createSession } from '@/lib/auth';

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
  }
  
  interface Session {
    user: User;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'OTP',
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
        userId: { label: "User ID", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp || !credentials?.userId) {
          return null;
        }

        const result = db.prepare(`
          SELECT * FROM otp_codes
          WHERE user_id = ?
          AND code = ?
          AND expires_at > datetime('now')
          AND used = FALSE
          LIMIT 1
        `).get(credentials.userId, credentials.otp) as { id: string } | undefined;

        if (!result) {
          return null;
        }

        db.prepare(`
          UPDATE otp_codes
          SET used = TRUE
          WHERE id = ?
        `).run(result.id);

        const user = db.prepare('SELECT * FROM users WHERE id = ?')
          .get(credentials.userId) as { id: string, email: string } | undefined;

        if (!user) {
          return null;
        }

        await createSession(user.id);

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        const stmt = db.prepare(`
          INSERT INTO users (id, email)
          VALUES (?, ?)
          ON CONFLICT(email) DO UPDATE SET
          email = excluded.email
          RETURNING id
        `);
        
        const dbUser = stmt.get(user.id, user.email!) as { id: string };
        await createSession(dbUser.id);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }