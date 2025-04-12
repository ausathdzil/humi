import { TrackSearchSkeleton } from '@/components/skeletons';
import TrackSearch from '@/components/track-search';
import { Suspense } from 'react';

export default function Moodboard({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <main className="grow bg-background">
      <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-16 flex flex-col items-center justify-center gap-4">
        <Suspense fallback={<TrackSearchSkeleton />}>
          <TrackSearch />
        </Suspense>
        {children}
      </div>
    </main>
  );
}
