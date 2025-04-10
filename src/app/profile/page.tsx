import { UserTopTracksSkeleton } from "@/components/skeletons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import { getAccessToken } from "@/lib/token";
import { getTopTracks } from "@/lib/track";
import { SimplifiedArtist, Track } from "@/lib/track.types";
import { Session, User } from "better-auth";
import Image from "next/image";
import { unauthorized } from "next/navigation";
import { Suspense } from "react";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    unauthorized();
  }

  return (
    <main className="grow bg-background">
      <div className="p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="flex flex-col gap-8 items-center justify-center w-full">
          <ProfileInfo user={session.user} />
          <h2 className="text-lg text-center font-bold">Top Tracks</h2>
          <Suspense fallback={<UserTopTracksSkeleton />}>
            <UserTopTracks session={session.session} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

function ProfileInfo({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="size-24">
        <AvatarImage src={user.image ?? undefined} />
        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-muted-foreground">
          @{user.name?.toLowerCase().replace(/\s+/g, "")}
        </p>
      </div>
    </div>
  );
}

async function UserTopTracks({ session }: { session: Session }) {
  const accessToken = await getAccessToken(session.userId);
  const topTracks = await getTopTracks(accessToken);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {topTracks.items.map((track: Track) => (
        <Card
          key={track.id}
          className="overflow-hidden group hover:bg-accent/50 transition-colors bg-none border-none shadow-none"
        >
          <CardContent>
            <div className="flex gap-4">
              <div className="relative size-16 flex-shrink-0 rounded-lg overflow-hidden ring-1 ring-border/50 group-hover:ring-primary/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h4 className="font-bold lg:text-xl line-clamp-1 group-hover:text-primary transition-colors">
                  {track.name}
                </h4>
                <p className="font-semibold text-sm lg:text-base text-muted-foreground line-clamp-1">
                  {track.artists
                    .map((artist: SimplifiedArtist) => artist.name)
                    .join(", ")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
