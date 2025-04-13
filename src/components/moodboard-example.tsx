import { ColorFamily } from '@/lib/actions';
import { getTrack } from '@/lib/spotify';
import { Moodboard } from './moodboard';

export default async function MoodboardExample() {
  const exampleTrack = await getTrack(
    '6qNALlmZa1ESnCxJmXE1K9?si=7defc63e2d714b96'
  );

  if (!exampleTrack) {
    return null;
  }

  const moodTags = ['Introspective', 'Vulnerable', 'Candid', 'Emotional'];
  const colors = [
    '#283149',
    '#41485f',
    '#6b778d',
    '#9cb4cc',
    '#d3d5ee',
    '#f0f0f0',
  ];
  
  const themeColor: ColorFamily = 'gray';

  return (
    <Moodboard
      title={exampleTrack.name}
      artists={exampleTrack.artists.map((artist) => artist.name).join(', ')}
      albumCover={exampleTrack.album.images[0].url}
      moodTags={moodTags}
      colors={colors}
      themeColor={themeColor}
    />
  );
}
