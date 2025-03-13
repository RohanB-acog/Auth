import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';

function getDisplayName(email: string): string {
  const name = email.split('@')[0];
  return name
    .split('.')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default async function DashboardPage() {
  const session = await getSession();
  const user = db.prepare('SELECT * FROM users WHERE id = ?')
    .get(session?.userId) as { 
      email: string; 
      created_at: string;
      is_admin: number;
    } | undefined;

  if (!user) {
    redirect('/');
  }

  const displayName = getDisplayName(user.email);
  const isAdmin = user.is_admin === 1;

  return isAdmin ? (
    <AdminDashboard displayName={displayName} email={user.email} />
  ) : (
    <UserDashboard displayName={displayName} email={user.email} />
  );
}