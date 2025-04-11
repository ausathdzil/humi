export default function Moodboard({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <main className="grow bg-background">
      <div className="p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center gap-8 md:gap-16">
        <h1 className="text-2xl font-bold">Moodboard</h1>
        {children}
      </div>
    </main>
  );
}
