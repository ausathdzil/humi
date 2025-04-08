import { SignInButton } from "@/components/auth-button";
import { Button } from "@/components/ui/button";
import { MicVocalIcon, Music4Icon, SwatchBookIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grow flex flex-col gap-16 pb-16">
      <div className="px-16 py-8 flex items-center gap-16">
        <div className="max-w-1/2 flex flex-col gap-8">
          <article className="space-y-4">
            <h1 className="font-bold text-6xl bg-gradient-to-r from-cyan-500 to-teal-500 text-transparent bg-clip-text">
              Turn Your Music Into{" "}
              <span className="font-serif font-semibold">Visual Emotions</span>
            </h1>
            <p className="font-semibold text-2xl">
              Humi creates{" "}
              <span className="font-serif bg-gradient-to-r from-pink-500 to-cyan-500 via-blue-500 text-transparent bg-clip-text">
                beautiful moodboards
              </span>{" "}
              from your favorite songs, visualizing the emotions and energy
              behind the music you love.
            </p>
          </article>
          <div className="flex items-center gap-4">
            <Button asChild className="w-fit" size="lg">
              <Link href="/visualize">
                <Music4Icon />
                <span>Visualize Your Music</span>
              </Link>
            </Button>
            <SignInButton />
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <Image src="/hero.svg" alt="Hero" width={300} height={300} />
        </div>
      </div>

      <div className="px-16 border-y p-8 grid grid-cols-3 gap-8">
        <div className="p-8 space-y-4">
          <Music4Icon
            className="bg-gradient-to-br from-pink-500 to-pink-600 text-primary-foreground p-2 rounded-lg shadow-lg"
            size={36}
          />
          <article className="space-y-4">
            <h2 className="font-bold text-2xl">Mood Tags</h2>
            <p className="font-semibold">
              Get 3-5 mood tags that perfectly capture the emotional tone of
              your favorite songs.
            </p>
          </article>
        </div>
        <div className="p-8 space-y-4">
          <SwatchBookIcon
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-primary-foreground p-2 rounded-lg shadow-lg"
            size={36}
          />
          <article className="space-y-4">
            <h2 className="font-bold text-2xl">Color Palette</h2>
            <p className="font-semibold">
              Generate a unique color palette that visually represents the mood
              and energy of your music.
            </p>
          </article>
        </div>
        <div className="p-8 space-y-4">
          <MicVocalIcon
            className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-primary-foreground p-2 rounded-lg shadow-lg"
            size={36}
          />
          <article className="space-y-4">
            <h2 className="font-bold text-2xl">Lyric Highlights</h2>
            <p className="font-semibold">
              Extract the most emotionally powerful lines from your favorite
              songs.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
