import { getAccount } from "@/db/data";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";

export default function Profile() {
  return (
    <main className="grow bg-background">
      <div className="p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center gap-8 md:gap-16">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileContent />
        </Suspense>
      </div>
    </main>
  );
}

async function ProfileContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const account = await getAccount();
  const topTracks = await getTopTracks(account.accessToken as string);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h2 className="text-xl font-bold">{session?.user?.name}</h2>
      <ul className="space-y-4 list-disc">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {topTracks.items.map((track: any) => (
          <li key={track.id}>
            <h1 className="text-lg font-bold">{track.name}</h1>
            <p className="text-sm text-muted-foreground">
              {track.artists[0].name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function getTopTracks(accessToken: string) {
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  return data;
}
