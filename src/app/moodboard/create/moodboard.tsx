'use client';

import { Button } from '@/components/ui/button';
import { saveMoodboard } from '@/db/action';
import { generateMoodboard } from '@/lib/actions';
import { useSession } from '@/lib/auth-client';
import { Track } from '@/lib/types';
import { LoaderIcon, SaveIcon, SparklesIcon } from 'lucide-react';
import Image from 'next/image';
import { useState, useTransition } from 'react';

export type Theme = {
  background: string;
  text: {
    title: string;
    artist: string;
  };
  tag?: {
    background: string;
    text: string;
  };
};

export function MoodboardForm({ track }: { track: Track }) {
  const [isLoading, setIsLoading] = useState(false);
  const [moodboardData, setMoodboardData] = useState<Awaited<
    ReturnType<typeof generateMoodboard>
  > | null>(null);

  const title = track.name;
  const artists = track.artists.map((artist) => artist.name).join(', ');
  const albumCover = track.album.images[0].url;
  const duration = track.duration_ms;
  const releaseDate = track.album.release_date;
  const popularity = track.popularity;

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);

          const formData = new FormData();
          formData.append('title', title);
          formData.append('artists', artists);
          formData.append('albumCover', albumCover);
          formData.append('duration', duration.toString());
          formData.append('releaseDate', releaseDate);
          formData.append('popularity', popularity.toString());

          const result = await generateMoodboard(formData);
          if (result) {
            setMoodboardData(result);
            console.log(result);
          }
          setIsLoading(false);
        }}
      >
        {!moodboardData && (
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <SparklesIcon />
            )}
            Generate Moodboard
          </Button>
        )}
      </form>
      {moodboardData && (
        <div className="space-y-4">
          <Moodboard
            title={title}
            artists={artists}
            albumCover={albumCover}
            moodTags={moodboardData.moodTags}
            colors={moodboardData.colors}
            theme={moodboardData.theme}
          />
          <div className="flex justify-end">
            <SaveMoodboard
              trackId={track.id}
              colors={moodboardData.colors}
              moodTags={moodboardData.moodTags}
              theme={moodboardData.theme}
            />
          </div>
        </div>
      )}
    </>
  );
}

export function Moodboard({
  title,
  artists,
  albumCover,
  moodTags,
  colors,
  theme,
}: {
  title: string;
  artists: string;
  albumCover: string;
  moodTags: string[];
  colors: string[];
  theme: Theme;
}) {
  return (
    <div
      className="w-full max-w-[600px] shadow-none rounded-lg"
      style={{ backgroundColor: theme.background }}
    >
      <div className="p-6">
        <div
          className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4 bg-white/10 rounded-2xl backdrop-blur-sm shadow-sm border-2"
          style={{ borderColor: theme.background }}
        >
          <div className="size-16 sm:size-24 rounded-2xl shadow-sm relative overflow-hidden">
            <Image
              src={albumCover}
              alt={`${title} album cover`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 64px, 96px"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent)]" />
          </div>
          <div className="flex-1">
            <h3
              className="text-lg sm:text-2xl font-bold line-clamp-1"
              style={{ color: theme.text.title }}
            >
              {title}
            </h3>
            <p
              className="font-semibold text-base sm:text-lg"
              style={{ color: theme.text.artist }}
            >
              {artists}
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div
          className="p-3 sm:p-4 bg-white/10 rounded-2xl backdrop-blur-sm shadow-sm border"
          style={{ borderColor: theme.background }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {moodTags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hover:scale-105 transition-transform duration-200"
                style={{
                  backgroundColor:
                    theme.tag?.background || 'rgba(255, 255, 255, 0.1)',
                  color: theme.tag?.text || theme.text.title,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className="size-8 sm:size-10 rounded-2xl shadow-sm relative overflow-hidden"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SaveMoodboard({
  trackId,
  colors,
  moodTags,
  theme,
}: {
  trackId: string;
  colors: string[];
  moodTags: string[];
  theme: Theme;
}) {
  const [isPending, startTransition] = useTransition();

  const session = useSession();
  if (!session.data || !session.data.user) {
    return null;
  }

  const user = session.data.user;
  const saveMoodboardWithUserId = saveMoodboard.bind(null, user.id);
  const handleAction = async (formData: FormData) => {
    startTransition(() => {
      saveMoodboardWithUserId(formData);
    });
  };

  return (
    <form action={handleAction}>
      <input type="hidden" name="trackId" value={trackId} />
      <input type="hidden" name="colors" value={colors} />
      <input type="hidden" name="moodTags" value={moodTags} />
      <input type="hidden" name="theme" value={JSON.stringify(theme)} />
      <Button type="submit" disabled={isPending}>
        {isPending ? <LoaderIcon className="animate-spin" /> : <SaveIcon />}
        Save Moodboard
      </Button>
    </form>
  );
}

// export function MoodboardSkeleton() {
//   return (
//     <div className="w-full max-w-[600px]">
//       <div className="p-6">
//         <div className="flex items-center gap-3 sm:gap-4">
//           <div className="size-16 sm:size-24 rounded-2xl relative overflow-hidden">
//             <Skeleton className="w-full h-full" />
//           </div>
//           <div className="flex-1">
//             <Skeleton className="h-6 sm:h-8 w-3/4 mb-2" />
//             <Skeleton className="h-4 sm:h-5 w-1/2" />
//           </div>
//         </div>
//       </div>
//       <div className="px-6 pb-6">
//         <div className="flex flex-wrap gap-2 mb-4">
//           {[...Array(4)].map((_, i) => (
//             <Skeleton key={i} className="h-6 w-20 rounded-full" />
//           ))}
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {[...Array(5)].map((_, i) => (
//             <Skeleton key={i} className="size-8 sm:size-10 rounded-2xl" />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
