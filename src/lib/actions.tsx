'use server';

import {
  colorFamilies,
  Moodboard,
  MoodboardSkeleton,
} from '@/components/moodboard';
import { google } from '@ai-sdk/google';
import { streamUI } from 'ai/rsc';
import { z } from 'zod';

export async function streamMoodboard(formData: FormData) {
  const title = formData.get('title') as string;
  const artists = formData.get('artists') as string;
  const albumCover = formData.get('albumCover') as string;
  const duration = Number(formData.get('duration'));
  const releaseDate = formData.get('releaseDate') as string;
  const popularity = Number(formData.get('popularity'));

  const prompt = `You are a creative music analyst. Based on the following track information, create a moodboard that captures its essence:

Track: ${title}
Artist: ${artists}
Duration: ${duration} ms
Release Date: ${releaseDate}
Popularity: ${popularity} / 100

Generate a moodboard by calling the createMoodboard tool with:
1. 4-6 mood tags that perfectly capture the track's emotional essence (e.g., "Melancholic", "Soulful", "Intimate", "Energetic", "Dreamy", "Nostalgic")
2. 5-7 hex color codes that reflect the track's mood and atmosphere. Use vibrant, saturated colors that pop and create visual interest. Include:
   - 1-2 bold, eye-catching primary colors
   - 2-3 complementary accent colors
   - 1-2 subtle background/neutral tones
3. A theme object that defines the visual style of the moodboard. The theme should include:
   - A base color family (choose from: ${colorFamilies.join(', ')})
   - A background color (use Tailwind color classes - don't be afraid to use darker shades like 800 or 900 for moody tracks)
   - Text colors for title and artist (ensure good contrast with background - use light colors like 50 or 100 for dark backgrounds)
   - Optional border color
   - Optional tag styling

IMPORTANT: 
- For energetic or happy tracks, use bright, saturated colors that pop (e.g., #FF5733, #33FF57, #3357FF)
- For moody or melancholic tracks, use deep, rich colors with high saturation (e.g., #BD93F9, #FF79C6, #6272A4)
- Always ensure text contrast by using appropriate text colors
- The background color should match the track's emotional tone
- Don't be afraid to use bold, vibrant colors that create visual impact

Example responses:

For a melancholic track:
{
  "moodTags": ["Melancholic", "Soulful", "Intimate"],
  "colors": ["#BD93F9", "#FF79C6", "#6272A4", "#44475A", "#282A3A"],
  "theme": {
    "baseColor": "indigo",
    "background": "bg-indigo-900",
    "text": {
      "title": "text-indigo-50",
      "artist": "text-indigo-100"
    },
    "border": "border-indigo-700/50",
    "tag": {
      "background": "bg-indigo-800",
      "text": "text-indigo-50",
      "border": "border-indigo-700/50"
    }
  }
}

For an energetic track:
{
  "moodTags": ["Energetic", "Vibrant", "Upbeat"],
  "colors": ["#FF5733", "#33FF57", "#3357FF", "#FFC300", "#FF33FF"],
  "theme": {
    "baseColor": "amber",
    "background": "bg-amber-100",
    "text": {
      "title": "text-amber-900",
      "artist": "text-amber-800"
    },
    "border": "border-amber-200/50",
    "tag": {
      "background": "bg-amber-200",
      "text": "text-amber-900",
      "border": "border-amber-300/50"
    }
  }
}`;

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
          theme: z.object({
            baseColor: z.enum(colorFamilies),
            background: z.string(),
            text: z.object({
              title: z.string(),
              artist: z.string(),
            }),
            border: z.string().optional(),
            tag: z
              .object({
                background: z.string(),
                text: z.string(),
                border: z.string(),
              })
              .optional(),
          }),
        }),
        generate: async function* ({ moodTags, colors, theme }) {
          yield <MoodboardSkeleton />;
          return (
            <Moodboard
              title={title}
              artists={artists}
              albumCover={albumCover}
              moodTags={moodTags}
              colors={colors}
              theme={theme}
            />
          );
        },
      },
    },
  });

  return result.value;
}
