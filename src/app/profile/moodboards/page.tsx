import { Moodboard } from '@/app/create/moodboard';
import DeleteMoodboard from '@/app/profile/moodboards/delete-moodboard';
import { ShareButton } from '@/app/profile/moodboards/share-button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getUserMoodboards } from '@/db/data';
import { getSession } from '@/lib/better-auth/auth';
import { SparklesIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { unauthorized } from 'next/navigation';
import { Suspense } from 'react';

export default function ProfileMoodboard() {
  return (
    <main className="grow bg-background">
      <div className="p-8 flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl text-primary font-bold">My Moodboards</h1>
        <Suspense fallback={<MoodboardSkeleton />}>
          <Moodboards />
        </Suspense>
      </div>
    </main>
  );
}

async function Moodboards() {
  const session = await getSession();
  if (!session) {
    unauthorized();
  }

  const user = session.user;
  const moodboards = await getUserMoodboards(user.id);

  if (moodboards.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-center text-muted-foreground font-semibold">
          <p className="text-lg">No moodboards saved yet</p>
          <p className="text-sm">
            Create your first moodboard and save it to see it here
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/create">
            <SparklesIcon />
            Create your first moodboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl flex flex-wrap justify-center gap-8">
      {moodboards.map((moodboard) => (
        <div key={moodboard.id} className="w-full max-w-[600px] space-y-4">
          <Moodboard
            title={moodboard.title}
            artists={moodboard.artists}
            albumCover={moodboard.albumCover}
            colors={moodboard.colors}
            moodTags={moodboard.moodTags}
            theme={moodboard.theme}
          />
          <div className="flex justify-center items-center gap-4">
            <p className="text-sm text-muted-foreground font-semibold">
              Created{' '}
              {new Date(moodboard.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <CTA userId={user.id} id={moodboard.id} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CTA({ userId, id }: { userId: string; id: string }) {
  return (
    <div className="flex items-center gap-2">
      <ShareButton moodboardId={id} />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="text-destructive hover:bg-destructive/10"
            variant="ghost"
            size="icon"
          >
            <TrashIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the moodboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <DeleteMoodboard userId={userId} id={id} />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function MoodboardSkeleton() {
  return (
    <div className="w-full max-w-7xl flex flex-wrap justify-center gap-8">
      <div className="w-full max-w-[600px]">
        <div className="p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="size-16 sm:size-24 rounded-2xl relative overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-6 sm:h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 sm:h-5 w-1/2" />
            </div>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="size-8 sm:size-10 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
