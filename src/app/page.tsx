import { SignInButton } from '@/components/auth-button';
import MoodboardExample from '@/components/moodboard-example';
import MorphButton from '@/components/morph-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  AudioWaveformIcon,
  MicVocalIcon,
  Music4Icon,
  SwatchBookIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className="grow flex flex-col bg-background">
        <div className="px-4 sm:px-8 md:px-16 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="w-full md:max-w-1/2 flex flex-col gap-8">
            <article className="space-y-4">
              <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl">
                Turn Your Music Into{' '}
                <span className="font-serif font-semibold bg-gradient-to-r from-pink-500 to-cyan-500 via-blue-500 text-transparent bg-clip-text">
                  Visual Emotions
                </span>
              </h1>
              <p className="font-semibold text-xl sm:text-2xl">
                Humi creates{' '}
                <span className="font-serif bg-gradient-to-r from-pink-500 to-cyan-500 via-blue-500 text-transparent bg-clip-text">
                  beautiful moodboards
                </span>{' '}
                from your favorite songs, visualizing the emotions and energy
                behind the music you love.
              </p>
            </article>
            <div className="flex flex-col lg:flex-row items-start gap-4">
              <Button asChild className="w-fit" size="lg">
                <Link href="/visualize">
                  <Music4Icon />
                  Visualize Your Music
                </Link>
              </Button>
              <SignInButton />
            </div>
          </div>

          <div className="relative w-[150px] h-[150px] lg:w-[300px] lg:h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-xl z-10">
              <div className="absolute inset-0 bg-black/10 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-20 sm:size-24 rounded-full bg-white/20 flex items-center justify-center">
                  <AudioWaveformIcon
                    className="text-white sm:hidden"
                    size={48}
                  />
                  <AudioWaveformIcon
                    className="text-white hidden sm:block"
                    size={64}
                  />
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] -translate-x-1/4 z-0">
              <div className="absolute inset-0 rounded-full overflow-hidden animate-spin-slow shadow-xl">
                <Image
                  src="/hero.svg"
                  alt="Vinyl Record"
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-black/20" />
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-16 border-y flex flex-col items-center justify-center gap-6 md:gap-8">
          <h2 className="font-bold text-xl sm:text-2xl text-center w-full md:w-1/2">
            Paste a Spotify link. Humi will analyze a song and generate a{' '}
            <span className="font-serif bg-gradient-to-r from-pink-500 to-cyan-500 via-blue-500 text-transparent bg-clip-text">
              beautiful, shareable moodboard
            </span>{' '}
            in seconds.
          </h2>
          <MoodboardExample />
          <MorphButton />
        </div>

        <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-16 grid lg:grid-cols-3 gap-8 lg:gap-16">
          <div className="py-4 sm:py-8 space-y-4">
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
          <div className="py-4 sm:py-8 space-y-4">
            <SwatchBookIcon
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-primary-foreground p-2 rounded-lg shadow-lg"
              size={36}
            />
            <article className="space-y-4">
              <h2 className="font-bold text-2xl">Color Palette</h2>
              <p className="font-semibold">
                Generate a unique color palette that visually represents the
                mood and energy of your music.
              </p>
            </article>
          </div>
          <div className="py-4 sm:py-8 space-y-4">
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

        <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-16 border-y flex flex-col items-center justify-center gap-6 md:gap-8">
          <h2 className="font-bold text-3xl sm:text-4xl text-center">
            Frequently Asked Questions
          </h2>
          <Accordion className="w-full lg:w-1/2" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How does Humi work?</AccordionTrigger>
              <AccordionContent>
                Humi analyzes your music using the Spotify API to extract audio
                features, track metadata, and lyrics. We then processes this
                data to identify mood tags, extract notable lyrics, and generate
                a color palette that matches the emotional tone of the song. All
                of this is combined into a beautiful, shareable moodboard.
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
                Each moodboard can be shared via a unique link or downloaded as
                an image. You can share your moodboards on social media,
                messaging apps, or anywhere you&apos;d like to showcase your
                music taste visually.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is Humi free to use?</AccordionTrigger>
              <AccordionContent>
                Humi allows you to create and share moodboards for free. We may
                introduce premium features in the future, but our core
                functionality will always remain accessible to everyone who
                loves music.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                How accurate are the mood tags?
              </AccordionTrigger>
              <AccordionContent>
                Our system uses open-source AI models to analyze audio features
                and lyrics, generating mood tags that aim to capture the
                emotional essence of a song. While music interpretation is
                inherently subjective and can vary between listeners, we strive
                to provide meaningful tags that help express the song&apos;s
                emotional character. You can always regenerate the tags if
                you&apos;d like to explore different interpretations of the
                song.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-16 flex flex-col items-center justify-center gap-4">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-center">
            Try Humi for Free
          </h2>
          <p className="font-semibold text-lg sm:text-xl text-center">
            Join us and create your own{' '}
            <span className="font-serif bg-gradient-to-r from-pink-500 to-cyan-500 via-blue-500 text-transparent bg-clip-text">
              moodboards
            </span>{' '}
            today.
          </p>
          <SignInButton />
        </div>
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="px-4 sm:px-8 md:px-16 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 bg-primary text-primary-foreground">
      <Link href="/" className="font-bold text-2xl">
        Humi
      </Link>
      <div className="flex flex-col gap-2">
        <span>Resources</span>
        <nav>
          <ul className="text-primary-foreground/80 space-y-2">
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/blog"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <span>Legal</span>
        <nav>
          <ul className="text-primary-foreground/80 space-y-2">
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/privacy"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/terms"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <span>Social</span>
        <ul className="text-primary-foreground/80 space-y-2">
          <li>
            <a
              className="hover:text-primary-foreground transition-colors"
              href="https://github.com/ausathdzil/humi"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="hover:text-primary-foreground transition-colors"
              href="https://x.com/ausathdzil"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
          </li>
          <li>
            <a
              className="hover:text-primary-foreground transition-colors"
              href="https://bsky.app/profile/ausathdzil.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bluesky
            </a>
          </li>
          <li>
            <a
              className="hover:text-primary-foreground transition-colors"
              href="https://www.instagram.com/ausathdzil"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <span>Contact</span>
        <ul className="text-primary-foreground/80 space-y-2">
          <li>
            <a
              className="hover:text-primary-foreground transition-colors"
              href="mailto:mail@ausathikram.com"
            >
              mail@ausathikram.com
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
