import { TrackSearch, TrackSearchSkeleton } from '@/app/moodboard/track-search';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense, unstable_ViewTransition as ViewTransition } from 'react';

export default function Moodboard({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <main className="grow bg-background">
      <div className="px-8 md:px-16 py-4 flex flex-col items-center justify-center gap-4">
        <ViewTransition>
          <Suspense fallback={<TrackSearchSkeleton />}>
            <TrackSearch />
          </Suspense>
        </ViewTransition>
        <ViewTransition>
          <Suspense fallback={<TrackResultSkeleton />}>{children}</Suspense>
        </ViewTransition>
      </div>
    </main>
  );
}

function TrackResultSkeleton() {
  return (
    <div className="w-full max-w-[240px] sm:max-w-[300px] px-6 py-6">
      <div className="flex gap-3">
        <div className="relative size-12 flex-shrink-0 rounded-sm overflow-hidden ring-1 ring-border/50">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
