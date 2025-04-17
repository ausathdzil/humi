import { getSession } from '@/lib/better-auth/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const session = await getSession();

  if (session?.user) {
    redirect('/profile');
  }

  return (
    <main className="grow flex flex-col items-center p-8 gap-8">
      {children}
    </main>
  );
}
