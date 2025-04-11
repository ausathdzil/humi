import TrackSearch from '@/components/track-search';

export default function Moodboard({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <main className="grow bg-background">
      <div className="p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center gap-4">
        <TrackSearch />
        {children}
      </div>
    </main>
  );
}
