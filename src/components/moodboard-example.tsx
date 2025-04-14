import { getTrack } from '@/lib/spotify';
import { Moodboard, Theme } from './moodboard';

export default async function MoodboardExample() {
  const exampleTrack = await getTrack('3be9ACTxtcL6Zm4vJRUiPG');

  if (!exampleTrack) {
    return null;
  }

  const moodTags = ['Dreamy', 'Chill', 'Relaxing', 'Soothing'];
  
  const colors = [
    '#90caf9',
    '#64b5f6',
    '#42a5f5',
    '#2196f3',
    '#1e88e5',
    '#1565c0',
  ];

  const theme: Theme = {
    background: '#e3f2fd',
    text: { title: '#1565c0', artist: '#1e88e5' },
    tag: { background: '#bbdefb', text: '#1565c0' },
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
