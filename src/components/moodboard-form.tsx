'use client';

import { Button } from '@/components/ui/button';
import { streamMoodboard } from '@/lib/actions';
import { Track } from '@/lib/spotify.types';
import { Loader, SparklesIcon } from 'lucide-react';
import { useState } from 'react';

export default function MoodboardForm({ track }: { track: Track }) {
  const [moodboard, setMoodboard] = useState<React.ReactNode>(null);
  const [isLoading, setIsLoading] = useState(false);

  const title = track.name;
  const artists = track.artists.map((artist) => artist.name).join(', ');
  const albumCover = track.album.images[0].url;
  const duration = track.duration_ms;
  const releaseDate = track.album.release_date;
  const popularity = track.popularity;

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          const formData = new FormData();
          formData.append('title', title);
          formData.append('artists', artists);
          formData.append('albumCover', albumCover);
          formData.append('duration', duration.toString());
          formData.append('releaseDate', releaseDate);
          formData.append('popularity', popularity.toString());

          try {
            const result = await streamMoodboard(formData);
            if (result) {
              setMoodboard(result);
            }
          } catch (error) {
            setMoodboard(
              <p className="text-destructive font-semibold">
                Sorry, we couldn&apos;t generate a moodboard for this track.{' '}
                {error instanceof Error ? error.message : 'Unknown error'}
              </p>
            );
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? <Loader className="animate-spin" /> : <SparklesIcon />}
          Generate Moodboard
        </Button>
      </form>
      {moodboard}
    </>
  );
}
