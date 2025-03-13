import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function SiteHeader() {
  const session = await getSession();
  const user = session ? db.prepare('SELECT email FROM users WHERE id = ?')
    .get(session.userId) as { email: string } : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background px-6">
      <div className="flex h-16 items-center justify-between">
        <MainNav />
        <div className="flex items-center gap-6">
          {user && <UserNav email={user.email} />}
        </div>
      </div>
    </header>
  );
}