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
      <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12 flex flex-col items-center justify-center gap-4">
        <Suspense
          fallback={
            <ViewTransition>
              <TrackSearchSkeleton />
            </ViewTransition>
          }
        >
          <ViewTransition>
            <TrackSearch />
          </ViewTransition>
        </Suspense>
        <Suspense
          fallback={
            <ViewTransition>
              <TrackResultSkeleton />
            </ViewTransition>
          }
        >
          <ViewTransition>{children}</ViewTransition>
        </Suspense>
      </div>
    </main>
  );
}
