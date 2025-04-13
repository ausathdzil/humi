import { getTrack } from '@/lib/spotify';
import { Moodboard, Theme } from './moodboard';

export default async function MoodboardExample() {
  const exampleTrack = await getTrack('7Cu2COdH93MnuireuKNiS3');

  if (!exampleTrack) {
    return null;
  }

  const moodTags = ['Soulful', 'Smooth', 'Intimate', 'Warm'];
  const colors = ['#C9ADA7', '#A68A86', '#8C6A5A', '#6E4A37', '#502A14'];

  const theme: Theme = {
    baseColor: 'stone',
    background: 'bg-stone-800',
    text: { title: 'text-stone-50', artist: 'text-stone-100' },
    border: 'border-stone-700/50',
    tag: {
      background: 'bg-stone-700',
      text: 'text-stone-50',
      border: 'border-stone-600/50',
    },
  };

  return (
    <Moodboard
      title={exampleTrack.name}
      artists={exampleTrack.artists.map((artist) => artist.name).join(', ')}
      albumCover={exampleTrack.album.images[0].url}
      moodTags={moodTags}
      colors={colors}
      theme={theme}
    />
  );
}
