import { SignInButton } from "@/components/auth-button";

export default function UnauthorizedPage() {
  return (
    <main className="grow bg-background">
      <div className="p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">401 - Unauthorized</h1>
        <p className="text-muted-foreground font-semibold">
          Please sign in to continue
        </p>
        <SignInButton />
      </div>
    </main>
  );
}
