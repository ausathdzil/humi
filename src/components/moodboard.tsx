import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ColorFamily } from '@/lib/actions';
import Image from 'next/image';

export function Moodboard({
  title,
  artists,
  albumCover,
  moodTags,
  colors,
  themeColor,
}: {
  title: string;
  artists: string;
  albumCover: string;
  moodTags: string[];
  colors: string[];
  themeColor: ColorFamily;
}) {
  const theme = {
    from: `from-${themeColor}-50/50`,
    to: `to-${themeColor}-50/50`,
    border: `border-${themeColor}-100/50`,
    gradient: `from-${themeColor}-900 to-${themeColor}-900`,
    tag: `from-${themeColor}-100 to-${themeColor}-100`,
    tagText: `text-${themeColor}-900`,
    tagBorder: `border-${themeColor}-200/50`,
    divider: `from-${themeColor}-200 to-${themeColor}-200`,
  };

  return (
    <Card
      className={`w-full max-w-[600px] bg-gradient-to-br ${theme.from} ${theme.to} shadow-none`}
    >
      <CardHeader>
        <div
          className={`p-3 sm:p-4 flex items-center gap-3 sm:gap-4 bg-white/80 rounded-2xl backdrop-blur-sm border ${theme.border}`}
        >
          <div className="size-16 sm:size-24 rounded-2xl shadow-sm relative overflow-hidden">
            <Image
              src={albumCover}
              alt={`${title} album cover`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 64px, 96px"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${theme.from.replace(
                '/50',
                '/20'
              )} ${theme.to.replace('/50', '/20')}`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-2xl font-bold">{title}</h3>
            <p className="text-muted-foreground font-semibold text-base sm:text-lg">
              {artists}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`p-3 sm:p-4 bg-white/80 rounded-2xl backdrop-blur-sm border ${theme.border}`}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {moodTags.map((tag) => (
              <span
                key={tag}
                className={`px-2 sm:px-3 py-1 bg-gradient-to-r ${theme.tag} ${theme.tagText} border ${theme.tagBorder} rounded-full text-xs sm:text-sm font-semibold hover:scale-105 transition-transform duration-200`}
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
      </CardContent>
    </Card>
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
