import { SignInButton } from "@/components/auth-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChevronRightIcon,
  MicVocalIcon,
  Music4Icon,
  SwatchBookIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grow flex flex-col pb-16">
      <div className="px-16 pt-16 pb-32 flex items-center justify-center gap-16">
        <div className="max-w-1/2 flex flex-col gap-8">
          <article className="space-y-4">
            <h1 className="font-bold text-6xl">
              Turn Your Music Into{" "}
              <span className="font-serif font-semibold bg-gradient-to-r from-pink-500 to-cyan-500 via-blue-500 text-transparent bg-clip-text">
                Visual Emotions
              </span>
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
        <Image
          className="animate-spin"
          src="/hero.svg"
          alt="Hero"
          width={300}
          height={300}
        />
      </div>

      <div className="p-16 border-y flex items-start justify-center gap-16">
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

      <div className="p-16 flex flex-col items-center justify-center gap-8">
        <h2 className="font-bold text-2xl text-center w-1/2">
          Select a song from your recently played tracks, top songs, or paste a
          Spotify link. Humi will analyze a song and generate a{" "}
          <span className="font-serif bg-gradient-to-r from-pink-500 to-cyan-500 via-blue-500 text-transparent bg-clip-text">
            beautiful, shareable moodboard
          </span>{" "}
          in seconds.
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" variant="outline">
              <span>See Humi in Action</span>
              <ChevronRightIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-r from-cyan-50 to-pink-50 via-blue-50 border-none">
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-16 border-y flex flex-col items-center justify-center gap-8">
        <h2 className="font-bold text-4xl text-center">
          Frequently Asked Questions
        </h2>
        <Accordion className="w-1/2" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How does Humi work?</AccordionTrigger>
            <AccordionContent>
              Humi analyzes your music using the Spotify API to extract audio
              features, track metadata, and lyrics. We then processes this data
              to identify mood tags, extract notable lyrics, and generate a
              color palette that matches the emotional tone of the song. All of
              this is combined into a beautiful, shareable moodboard.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need a Spotify account?</AccordionTrigger>
            <AccordionContent>
              You can either sign in with Spotify to access your personal
              library and listening history, or you can paste a Spotify track
              link without signing in. However, signing in provides a more
              personalized experience and allows you to save your moodboards.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I share my moodboards?</AccordionTrigger>
            <AccordionContent>
              Each moodboard can be shared via a unique link or downloaded as an
              image. You can share your moodboards on social media, messaging
              apps, or anywhere you&apos;d like to showcase your music taste
              visually.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Is Humi free to use?</AccordionTrigger>
            <AccordionContent>
              Humi allows you to create and share moodboards for free. We may
              introduce premium features in the future, but our core
              functionality will always remain accessible to everyone who loves
              music.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How accurate are the mood tags?</AccordionTrigger>
            <AccordionContent>
              Our system uses open-source AI models to analyze audio features
              and lyrics, generating mood tags that aim to capture the emotional
              essence of a song. While music interpretation is inherently
              subjective and can vary between listeners, we strive to provide
              meaningful tags that help express the song&apos;s emotional
              character. You can always regenerate the tags if you&apos;d like
              to explore different interpretations of the song.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
