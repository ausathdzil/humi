import {
  TrackResultSkeleton,
  TrackSearchSkeleton,
} from '@/components/skeletons';
import TrackSearch from '@/components/track-search';
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
