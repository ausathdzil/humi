'use server';

import { Moodboard, MoodboardSkeleton } from '@/components/moodboard';
import { google } from '@ai-sdk/google';
import { streamUI } from 'ai/rsc';
import { z } from 'zod';

const StreamMoodboardSchema = z.object({
  title: z.string(),
  artists: z.string(),
  albumCover: z.string(),
  duration: z.number(),
  releaseDate: z.string(),
  popularity: z.number(),
});

export async function streamMoodboard(formData: FormData) {
  const rawFormData = {
    title: formData.get('title') as string,
    artists: formData.get('artists') as string,
    albumCover: formData.get('albumCover') as string,
    duration: Number(formData.get('duration')),
    releaseDate: formData.get('releaseDate') as string,
    popularity: Number(formData.get('popularity')),
  };

  const validatedFields = StreamMoodboardSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return;
  }

  const { title, artists, albumCover, duration, releaseDate, popularity } =
    validatedFields.data;

  const prompt = `Create a moodboard for this track:

${title} by ${artists}
Duration: ${duration}ms, Released: ${releaseDate}, Popularity: ${popularity}/100

Generate:
1. 4-6 mood tags
2. 5-7 colors (primary, accent, neutral)
3. Theme object with:
   - Background (hex/rgba)
   - Text colors (title/artist)
   - Optional tag styling

Guidelines:
- Colors should reflect the track's mood
- Use subtle gradients and transitions
- Ensure good contrast
- Be creative with color combinations

Example (melancholic):
{
  "moodTags": ["Melancholic", "Soulful", "Intimate"],
  "colors": ["#BD93F9", "#A37DF0", "#6272A4", "#44475A", "#282A3A"],
  "theme": {
    "background": "#1e1b4b",
    "text": {
      "title": "#e0e7ff",
      "artist": "#c7d2fe"
    },
    "tag": {
      "background": "#312e81",
      "text": "#e0e7ff"
    }
  }
}`;

  const result = await streamUI({
    model: google('gemini-2.0-flash-001'),
    prompt,
    tools: {
      createMoodboard: {
        description: 'Create a moodboard for a track',
        parameters: z.object({
          moodTags: z.array(z.string()),
          colors: z.array(z.string()),
          theme: z.object({
            background: z.string(),
            text: z.object({
              title: z.string(),
              artist: z.string(),
            }),
            tag: z
              .object({
                background: z.string(),
                text: z.string(),
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
