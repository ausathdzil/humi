import { SignInWithSpotify } from '@/components/auth-components';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <main className="grow bg-background flex flex-col items-center">
      <div className="p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">401 - Unauthorized</h1>
        <p className="text-muted-foreground font-semibold">
          Please sign in to continue
        </p>
        <SignInWithSpotify />
        <p className="text-muted-foreground font-semibold">or</p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/auth/signin">Sign in with credentials</Link>
        </Button>
      </div>
    </main>
  );
}
