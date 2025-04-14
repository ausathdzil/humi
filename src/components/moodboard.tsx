import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

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
                className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hover:scale-105 transition-transform duration-200 border-2"
                style={{
                  backgroundColor:
                    theme.tag?.background || 'rgba(255, 255, 255, 0.1)',
                  color: theme.tag?.text || theme.text.title,
                  borderColor: theme.background,
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

export function MoodboardSkeleton() {
  return (
    <div className="w-full max-w-[600px] space-y-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <Skeleton className="size-16 sm:size-24 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 sm:h-8 w-3/4" />
          <Skeleton className="h-4 sm:h-5 w-1/2" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
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
  );
}
