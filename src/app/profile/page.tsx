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

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
