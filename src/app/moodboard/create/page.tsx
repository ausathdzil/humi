import { getTrack } from '@/lib/spotify';
import { extractSpotifyTrackId } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { Suspense } from 'react';

interface CreateMoodboardProps {
  searchParams: Promise<{
    q: string;
  }>;
}

export default async function CreateMoodboard(props: CreateMoodboardProps) {
  const { q } = await props.searchParams;
  const trackId = extractSpotifyTrackId(q);

  if (!trackId) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <AlertCircle className="h-12 w-12 text-warning" />
        <h1 className="text-3xl font-bold text-warning">
          Invalid Spotify Track
        </h1>
        <p className="text-lg font-semibold max-w-md">
          Please provide a valid Spotify track URL or ID. The URL should look
          like:
          <br />
          <code className="mt-2 block text-sm bg-muted p-2 rounded-md">
            https://open.spotify.com/track/...
          </code>
        </p>
      </div>
    );
  }

  const track = await getTrack(trackId);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <p>{track.name}</p>
    </Suspense>
  );
}
