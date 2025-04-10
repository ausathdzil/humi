"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <main className="grow bg-background">
      <h1 className="text-2xl font-bold">Error</h1>
      <p>Something went wrong!</p>
      <Button onClick={() => router.push("/")}>Go Home</Button>
    </main>
  );
}
