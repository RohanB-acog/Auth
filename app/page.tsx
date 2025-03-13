// import { redirect } from 'next/navigation';
// import { getSession } from '@/lib/auth';
// import LoginForm from '@/components/login-form';

// export const dynamic = 'force-dynamic';

// export default async function Home() {
//   const session = await getSession();
  
//   if (session?.userId) {
//     redirect('/dashboard');
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-background">
//       <LoginForm />
//     </main>
//   );
// }

import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import LoginForm from '@/components/login-form';

export const dynamic = 'auto';
export const dynamicParams = true;

export default async function Home() {
  const session = await getSession();
  
  if (session?.userId) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <LoginForm />
    </main>
  );
}