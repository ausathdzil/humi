import { Moodboard } from '@/app/create/moodboard';
import { MoodboardSkeleton } from '@/app/profile/moodboards/page';
import { ShareButton } from '@/app/profile/moodboards/share-button';
import { getMoodboard, getPublicUser } from '@/db/data';
import { Suspense } from 'react';

interface MoodboardPageProps {
  params: Promise<{ id: string }>;
}

export default async function MoodboardPage(props: MoodboardPageProps) {
  const { id } = await props.params;

  const moodboard = await getMoodboard(id);
  const user = await getPublicUser(moodboard.userId);

  if (!moodboard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-destructive">
          Moodboard not found
        </h1>
      </div>
    );
  }

  return (
    <main className="grow bg-background">
      <div className="p-16 flex flex-col items-center justify-center gap-8">
        <Suspense fallback={<MoodboardSkeleton />}>
          <div className="w-full max-w-[600px] flex flex-col items-center justify-center gap-4">
            <Moodboard
              title={moodboard.title}
              artists={moodboard.artists}
              albumCover={moodboard.albumCover}
              colors={moodboard.colors}
              moodTags={moodboard.moodTags}
              theme={moodboard.theme}
            />
            <p className="text-sm text-muted-foreground font-semibold text-center">
              Created at{' '}
              {new Date(moodboard.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}{' '}
              by {user.name}
            </p>
            <ShareButton moodboardId={id} />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
