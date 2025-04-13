import MoodboardForm from '@/components/moodboard-form';
import { Card, CardContent } from '@/components/ui/card';
import { getTrack } from '@/lib/spotify';
import { Track } from '@/lib/spotify.types';
import { extractSpotifyTrackId } from '@/lib/utils';
import { AlertCircle, Disc3 } from 'lucide-react';
import Image from 'next/image';

interface CreateMoodboardProps {
  searchParams: Promise<{
    q: string;
  }>;
}

export default async function CreateMoodboard(props: CreateMoodboardProps) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q;

  if (!searchParams || !q) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center min-h-[60vh] px-4">
        <Disc3 className="size-10 sm:size-16 text-muted-foreground" />
        <h1 className="text-xl sm:text-3xl font-bold text-muted-foreground">
          Create a Moodboard
        </h1>
        <p className="text-sm sm:text-lg max-w-md font-semibold text-muted-foreground text-center">
          Enter a Spotify track URL or ID in the search bar above to create a
          moodboard.
          <br />
          <code className="mt-1 sm:mt-2 block text-[9px] sm:text-sm bg-muted px-1.5 py-1 sm:p-2 rounded-md overflow-hidden text-ellipsis whitespace-nowrap w-full">
            https://open.spotify.com/track/2LlOeW5rVcvl3QcPNPcDus
          </code>
          <span className="mt-0.5 sm:mt-1 block text-[9px] sm:text-sm text-muted-foreground">
            or
          </span>
          <code className="mt-0.5 sm:mt-1 block text-[9px] sm:text-sm bg-muted px-1.5 py-1 sm:p-2 rounded-md overflow-hidden text-ellipsis whitespace-nowrap w-full">
            2LlOeW5rVcvl3QcPNPcDus
          </code>
        </p>
      </div>
    );
  }

  const trackId = extractSpotifyTrackId(q);

  if (!trackId) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center min-h-[60vh] px-4">
        <AlertCircle className="size-10 sm:size-16 text-warning" />
        <h1 className="text-xl sm:text-3xl font-bold text-warning">
          Invalid Spotify Track
        </h1>
        <p className="text-sm sm:text-lg font-semibold max-w-md text-muted-foreground text-center">
          Please provide a valid Spotify track URL or ID. The URL should look
          like:
          <br />
          <code className="mt-1 sm:mt-2 block text-[9px] sm:text-sm bg-muted px-1.5 py-1 sm:p-2 rounded-md overflow-hidden text-ellipsis whitespace-nowrap w-full">
            https://open.spotify.com/track/2LlOeW5rVcvl3QcPNPcDus
          </code>
          <span className="mt-0.5 sm:mt-1 block text-[9px] sm:text-sm text-muted-foreground">
            or
          </span>
          <code className="mt-0.5 sm:mt-1 block text-[9px] sm:text-sm bg-muted px-1.5 py-1 sm:p-2 rounded-md overflow-hidden text-ellipsis whitespace-nowrap w-full">
            2LlOeW5rVcvl3QcPNPcDus
          </code>
        </p>
      </div>
    );
  }

  const track = await getTrack(trackId);

  if (!track) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center min-h-[60vh] px-4">
        <AlertCircle className="size-10 sm:size-16 text-warning" />
        <h1 className="text-xl sm:text-3xl font-bold text-warning">
          Track Not Found
        </h1>
        <p className="text-sm sm:text-lg font-semibold max-w-md text-muted-foreground text-center">
          We couldn&apos;t find the track you&apos;re looking for. Please make
          sure the Spotify track URL or ID is correct and try again.
        </p>
      </div>
    );
  }

  return (
    <>
      <TrackResult track={track} />
      <div className="w-full flex flex-col gap-8 items-center justify-center">
        <MoodboardForm track={track} />
      </div>
    </>
  );
}

function TrackResult({ track }: { track: Track }) {
  return (
    <Card className="w-[280px] bg-primary/5 sm:bg-background sm:hover:bg-primary/5 group transition-colors border-primary/10 border-2 shadow-none">
      <CardContent>
        <div className="flex gap-3">
          <div className="relative size-12 flex-shrink-0 rounded-sm overflow-hidden ring-1 ring-border/50 group-hover:ring-primary/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
            <Image
              src={track.album.images[0].url}
              alt={track.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <h3 className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors">
              {track.name}
            </h3>
            <p className="font-semibold text-xs text-muted-foreground line-clamp-1">
              {track.artists.map((artist) => artist.name).join(', ')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
