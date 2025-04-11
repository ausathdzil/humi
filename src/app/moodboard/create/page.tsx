import { Card, CardContent } from '@/components/ui/card';
import { getTrack } from '@/lib/spotify';
import { extractSpotifyTrackId } from '@/lib/utils';
import { AlertCircle, Disc3 } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';

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
      <div className="flex flex-col items-center justify-center gap-4 text-center min-h-[60vh]">
        <Disc3 className="size-12 text-muted-foreground" />
        <h1 className="text-3xl font-bold text-muted-foreground">
          Create a Moodboard
        </h1>
        <p className="text-lg max-w-md font-semibold text-muted-foreground text-center">
          Enter a Spotify track URL or ID in the search bar above to create a
          moodboard.
          <br />
          <code className="mt-2 block text-sm bg-muted p-2 rounded-md line-clamp-1">
            https://open.spotify.com/track/2LlOeW5rVcvl3QcPNPcDus
          </code>
          <span className="mt-1 block text-sm text-muted-foreground">or</span>
          <code className="mt-1 block text-sm bg-muted p-2 rounded-md line-clamp-1">
            2LlOeW5rVcvl3QcPNPcDus
          </code>
        </p>
      </div>
    );
  }

  const trackId = extractSpotifyTrackId(q);

  if (!trackId) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center min-h-[60vh]">
        <AlertCircle className="size-12 text-warning" />
        <h1 className="text-3xl font-bold text-warning">
          Invalid Spotify Track
        </h1>
        <p className="text-lg font-semibold max-w-md text-muted-foreground text-center">
          Please provide a valid Spotify track URL or ID. The URL should look
          like:
          <br />
          <code className="mt-2 block text-sm bg-muted p-2 rounded-md line-clamp-1">
            https://open.spotify.com/track/2LlOeW5rVcvl3QcPNPcDus
          </code>
          <span className="mt-1 block text-sm">or</span>
          <code className="mt-1 block text-sm bg-muted p-2 rounded-md line-clamp-1">
            2LlOeW5rVcvl3QcPNPcDus
          </code>
        </p>
      </div>
    );
  }

  const track = await getTrack(trackId);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center gap-4">
        <Card className="overflow-hidden group hover:bg-accent/50 transition-colors bg-none border-none shadow-none w-full max-w-4xl">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="relative w-[200px] sm:w-[300px] aspect-square rounded-lg overflow-hidden ring-1 ring-border/50 group-hover:ring-primary/50 transition-all mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-2 text-center">
                <h3 className="font-bold text-2xl line-clamp-1 group-hover:text-primary transition-colors">
                  {track.name}
                </h3>
                <p className="font-semibold text-muted-foreground line-clamp-1">
                  {track.artists.map((artist) => artist.name).join(', ')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
