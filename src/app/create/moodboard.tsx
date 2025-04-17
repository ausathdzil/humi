'use client';

import { Button } from '@/components/ui/button';
import { saveMoodboard } from '@/db/action';
import { generateMoodboard } from '@/lib/action';
import { useSession } from '@/lib/auth-client';
import { Track } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Session } from 'better-auth';
import { LoaderIcon, SaveIcon, SparklesIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface Theme {
  background: string;
  text: {
    title: string;
    artist: string;
  };
  tag?: {
    background: string;
    text: string;
  };
}

export function MoodboardForm({ track }: { track: Track }) {
  const [isLoading, setIsLoading] = useState(false);
  const [moodboardData, setMoodboardData] = useState<Awaited<
    ReturnType<typeof generateMoodboard>
  > | null>(null);

  const session = useSession();

  const title = track.name;
  const artists = track.artists.map((artist) => artist.name);
  const albumCover = track.album.images[0].url;
  const duration = track.duration_ms;
  const releaseDate = track.album.release_date;
  const popularity = track.popularity;

  const handleGenerate = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artists', artists.join(','));
    formData.append('albumCover', albumCover);
    formData.append('duration', duration.toString());
    formData.append('releaseDate', releaseDate);
    formData.append('popularity', popularity.toString());

    const result = await generateMoodboard(formData);
    if (result) {
      setMoodboardData(result);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setMoodboardData(null);
  }, [track.id]);

  return (
    <>
      {!moodboardData && (
        <GenerateMoodboardForm
          isLoading={isLoading}
          onSubmit={handleGenerate}
          buttonText="Generate Moodboard"
        />
      )}
      {moodboardData && (
        <div className="flex flex-col gap-4 items-center justify-center">
          <Moodboard
            title={title}
            artists={artists}
            albumCover={albumCover}
            moodTags={moodboardData.moodTags}
            colors={moodboardData.colors}
            theme={moodboardData.theme}
          />
          <div
            className={cn(
              'w-full flex gap-4',
              !session.data?.session ? 'justify-center' : 'justify-end'
            )}
          >
            <GenerateMoodboardForm
              isLoading={isLoading}
              onSubmit={handleGenerate}
              buttonText="Regenerate"
              variant="ghost"
            />
            <SaveMoodboard
              session={session.data ? session.data.session : null}
              trackId={track.id}
              title={title}
              artists={artists}
              albumCover={albumCover}
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

interface GenerateMoodboardFormProps {
  isLoading: boolean;
  onSubmit: () => Promise<void>;
  buttonText: string;
  variant?: 'default' | 'ghost';
}

function GenerateMoodboardForm({
  isLoading,
  onSubmit,
  buttonText,
  variant = 'default',
}: GenerateMoodboardFormProps) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit();
      }}
    >
      <Button type="submit" variant={variant} disabled={isLoading}>
        {isLoading ? <LoaderIcon className="animate-spin" /> : <SparklesIcon />}
        {buttonText}
      </Button>
    </form>
  );
}

interface MoodboardProps {
  title: string;
  artists: string[];
  albumCover: string;
  moodTags: string[];
  colors: string[];
  theme: Theme;
}

export function Moodboard(props: MoodboardProps) {
  const { title, artists, albumCover, moodTags, colors, theme } = props;

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
              {artists.join(', ')}
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

interface SaveMoodboardProps {
  session: Session | null;
  trackId: string;
  title: string;
  artists: string[];
  albumCover: string;
  colors: string[];
  moodTags: string[];
  theme: Theme;
}

function SaveMoodboard(props: SaveMoodboardProps) {
  const {
    title,
    artists,
    albumCover,
    session,
    trackId,
    colors,
    moodTags,
    theme,
  } = props;

  const [isPending, setIsPending] = useState(false);
  const saveMoodboardWithUserId = saveMoodboard.bind(null, session?.userId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await saveMoodboardWithUserId(formData);

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success(result.message, {
        position: 'bottom-center',
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: 'bottom-center',
        });
      } else {
        toast.error('An unknown error occurred', {
          position: 'bottom-center',
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="trackId" value={trackId} />
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="artists" value={artists} />
      <input type="hidden" name="albumCover" value={albumCover} />
      <input type="hidden" name="colors" value={colors} />
      <input type="hidden" name="moodTags" value={moodTags} />
      <input type="hidden" name="theme" value={JSON.stringify(theme)} />
      <Button variant="ghost" type="submit" disabled={isPending}>
        {isPending ? <LoaderIcon className="animate-spin" /> : <SaveIcon />}
        Save
      </Button>
    </form>
  );
}
