import { SignOutButton } from '@/components/auth-button';
import {
  ProfileInfoSkeleton,
  RecentlyPlayedSkeleton,
  TopTracksSkeleton,
} from '@/components/skeletons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { getAccessToken, getUser } from '@/db/data';
import { getRecentlyPlayed, getTopTracks } from '@/lib/spotify';
import { SimplifiedArtist } from '@/lib/spotify.types';
import Image from 'next/image';
import Link from 'next/link';
import { unauthorized } from 'next/navigation';
import { Suspense } from 'react';
import { unstable_ViewTransition as ViewTransition } from 'react';

export default function Profile() {
  return (
    <main className="grow bg-background">
      <div className="p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Suspense
            fallback={
              <ViewTransition>
                <ProfileInfoSkeleton />
              </ViewTransition>
            }
          >
            <ViewTransition>
              <ProfileInfo />
            </ViewTransition>
          </Suspense>
        </div>
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

async function ProfileInfo() {
  const user = await getUser();

  if (!user) {
    unauthorized();
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="font-semibold text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* <Button variant="secondary" size="lg" asChild>
          <Link href="/settings">Edit Profile</Link>
        </Button> */}
        <SignOutButton />
      </div>
    </div>
  );
}

async function RecentlyPlayed() {
  const user = await getUser();

  if (!user) {
    unauthorized();
  }

  const accessToken = await getAccessToken(user.id);
  const recentlyPlayed = await getRecentlyPlayed(accessToken);

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {recentlyPlayed.items.map((item) => (
        <Link key={item.track.id} href={`/moodboard/create?q=${item.track.id}`}>
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
  const topTracks = await getTopTracks(accessToken);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {topTracks.items.map((item) => (
        <Link key={item.id} href={`/moodboard/create?q=${item.id}`}>
          <Card
            key={item.id}
            className="overflow-hidden group hover:bg-accent/50 transition-colors bg-none border-none shadow-none"
          >
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
