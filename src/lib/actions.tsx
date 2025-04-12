'use server';

import { Moodboard, MoodboardSkeleton } from '@/components/moodboard';
import { google } from '@ai-sdk/google';
import { streamUI } from 'ai/rsc';
import { z } from 'zod';

const colorFamilies = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;

export type ColorFamily = (typeof colorFamilies)[number];

export async function streamMoodboard(formData: FormData) {
  const title = formData.get('title') as string;
  const artists = formData.get('artists') as string;
  const albumCover = formData.get('albumCover') as string;
  const duration = Number(formData.get('duration'));

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes === 0) {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
    if (seconds === 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${
      seconds !== 1 ? 's' : ''
    }`;
  };

  const formattedDuration = formatDuration(duration);

  const prompt = `You are a creative music analyst. Based on the following track information, create a moodboard that captures its essence:

Track: ${title}
Artist: ${artists}
Duration: ${formattedDuration}

Generate a moodboard by calling the createMoodboard tool with:
1. 4-6 mood tags that perfectly capture the track's emotional essence (e.g., "Melancholic", "Soulful", "Intimate", "Energetic", "Dreamy", "Nostalgic")
2. 5-7 hex color codes that reflect the track's mood and atmosphere, including both primary and accent colors
3. A Tailwind CSS color family to be used as a base theme. Choose ONLY one of these: ${colorFamilies.join(
    ', '
  )}

Example: "amber"`;

  const result = await streamUI({
    model: google('gemini-2.0-flash-001'),
    prompt,
    text: ({ content }) => <div>{content}</div>,
    tools: {
      createMoodboard: {
        description: 'Create a moodboard for a track',
        parameters: z.object({
          moodTags: z.array(z.string()),
          colors: z.array(z.string()),
          themeColor: z.enum(colorFamilies),
        }),
        generate: async function* ({ moodTags, colors, themeColor }) {
          yield <MoodboardSkeleton />;
          
          return (
            <Moodboard
              title={title}
              artists={artists}
              albumCover={albumCover}
              moodTags={moodTags}
              colors={colors}
              themeColor={themeColor}
            />
          );
        },
      },
    },
  });

  return result.value;
}
