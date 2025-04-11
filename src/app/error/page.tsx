import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function Error() {
  return (
    <main className="grow bg-background flex flex-col items-center justify-center gap-4">
      <article className="text-center">
        <h1 className="text-4xl font-bold text-destructive">Error</h1>
        <p className="text-xl text-muted-foreground font-semibold">
          Something went wrong!
        </p>
      </article>
      <Button size="lg" asChild>
        <Link href="/">
          <ChevronLeftIcon />
          Go Home
        </Link>
      </Button>
    </main>
  );
}
