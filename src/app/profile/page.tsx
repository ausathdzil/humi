import { getAccount } from "@/db/data";
import { getSession } from "@/lib/auth";
import { getTopTracks } from "@/lib/track";
import { unauthorized } from "next/navigation";
import { Suspense } from "react";

export default function Profile() {
  return (
    <main className="grow bg-background">
      <div className="p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileContent />
        </Suspense>
      </div>
    </main>
  );
}

async function ProfileContent() {
  const session = await getSession();

  if (!session) {
    unauthorized();
  }

  const user = session.user;
  const account = await getAccount(session.session);

  if (!account.accessToken) {
    return <div>No access token</div>;
  }

  const topTracks = await getTopTracks(account.accessToken);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <ul className="space-y-4 list-disc">
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
