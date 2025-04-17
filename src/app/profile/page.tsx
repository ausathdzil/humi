import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getAccessToken, getUser } from '@/db/data';
import { getRecentlyPlayed, getTopTracks } from '@/lib/spotify/data';
import { SimplifiedArtist } from '@/lib/spotify/types';
import Image from 'next/image';
import Link from 'next/link';
import { unauthorized } from 'next/navigation';
import { Suspense, unstable_ViewTransition as ViewTransition } from 'react';

export default function Profile() {
  return (
    <main className="grow bg-background">
      <div className="p-4 sm:p-8 flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <h2 className="text-xl text-center font-bold">Recently Played</h2>
          <Suspense
            fallback={
              <ViewTransition>
                <RecentlyPlayedSkeleton />
              </ViewTransition>
            }
          >
            <ViewTransition>
              <RecentlyPlayed />
            </ViewTransition>
          </Suspense>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <h2 className="text-xl text-center font-bold">Top Tracks</h2>
          <Suspense
            fallback={
              <ViewTransition>
                <TopTracksSkeleton />
              </ViewTransition>
            }
          >
            <ViewTransition>
              <TopTracks />
            </ViewTransition>
          </Suspense>
        </div>
      </div>
    </main>
  );
}

async function RecentlyPlayed() {
  const user = await getUser();

  if (!user) {
    unauthorized();
  }

  const accessToken = await getAccessToken(user.id);

  if (!accessToken) {
    return (
      <p className="text-muted-foreground text-center">
        Sign in with Spotify to see your recently played tracks
      </p>
    );
  }

  const recentlyPlayed = await getRecentlyPlayed(accessToken);

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {recentlyPlayed.items.map((item, i) => (
        <Link key={i} href={`/create?q=${item.track.id}`}>
          <Card className="overflow-hidden group hover:bg-accent/50 transition-colors bg-none border-none shadow-none">
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="relative aspect-square rounded-md overflow-hidden ring-1 ring-border/50 group-hover:ring-primary/50 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                  <Image
                    src={item.track.album.images[0].url}
                    alt={item.track.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                    {item.track.name}
                  </h3>
                  <p className="font-semibold text-muted-foreground line-clamp-1">
                    {item.track.artists.map((artist) => artist.name).join(', ')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

async function TopTracks() {
  const user = await getUser();

  if (!user) {
    unauthorized();
  }

  const accessToken = await getAccessToken(user.id);

  if (!accessToken) {
    return (
      <p className="text-muted-foreground text-center">
        Sign in with Spotify to see your top tracks
      </p>
    );
  }

  const topTracks = await getTopTracks(accessToken);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {topTracks.items.map((item, i) => (
        <Link key={i} href={`/create?q=${item.id}`}>
          <Card className="overflow-hidden group hover:bg-accent/50 transition-colors bg-none border-none shadow-none">
            <CardContent>
              <div className="flex gap-4">
                <div className="relative size-16 flex-shrink-0 rounded-sm overflow-hidden ring-1 ring-border/50 group-hover:ring-primary/50 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                  <Image
                    src={item.album.images[0].url}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h3 className="font-bold lg:text-xl line-clamp-1 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-semibold text-sm lg:text-base text-muted-foreground line-clamp-1">
                    {item.artists
                      .map((artist: SimplifiedArtist) => artist.name)
                      .join(', ')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function RecentlyPlayedSkeleton() {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 px-6 py-6">
          <div className="relative aspect-square rounded-md overflow-hidden ring-1 ring-border/50">
            <Skeleton className="w-full h-full" />
          </div>
          <div>
            <Skeleton className="h-5 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TopTracksSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex gap-4 px-6 py-6">
          <div className="relative size-16 flex-shrink-0 rounded-sm overflow-hidden ring-1 ring-border/50">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="w-1/2 flex flex-col justify-center min-w-0">
            <Skeleton className="h-6 w-full mb-1 lg:h-7" />
            <Skeleton className="h-4 w-3/4 lg:h-5" />
          </div>
        </div>
      ))}
    </div>
  );
}
