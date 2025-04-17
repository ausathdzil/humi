'use server';

import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

const GenerateMoodboardSchema = z.object({
  title: z.string(),
  artists: z.array(z.string()),
  albumCover: z.string(),
  duration: z.number(),
  releaseDate: z.string(),
  popularity: z.number(),
});

export type MoodboardData = {
  moodTags: string[];
  colors: string[];
  theme: {
    background: string;
    text: {
      title: string;
      artist: string;
    };
    tag?: {
      background: string;
      text: string;
    };
  };
};

export async function generateMoodboard(formData: FormData) {
  const rawFormData = {
    title: formData.get('title') as string,
    artists: (formData.get('artists') as string).split(','),
    albumCover: formData.get('albumCover') as string,
    duration: Number(formData.get('duration')),
    releaseDate: formData.get('releaseDate') as string,
    popularity: Number(formData.get('popularity')),
  };

  const validatedFields = GenerateMoodboardSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return;
  }

  const { title, artists, albumCover, duration, releaseDate, popularity } =
    validatedFields.data;

  const timestamp = new Date().toISOString();
  const randomSeed = Math.random().toString(36).substring(7);

  const prompt = `Create a moodboard for this track (generated at ${timestamp}):

${title} by ${artists}
Album Cover: ${albumCover}
Duration: ${duration}ms, Released: ${releaseDate}, Popularity: ${popularity}/100

Generate a unique and creative moodboard that captures the essence of this track.
Consider the following aspects:
1. 5 mood tags that reflect the track's emotional impact
2. 5-7 colors (primary, accent, neutral) that complement the album art
3. Theme object with:
   - Background (hex) that sets the right atmosphere
   - Text colors (title/artist) that ensure readability
   - Optional tag styling that adds visual interest

Guidelines:
- Colors must match track mood and album cover
- Text must contrast with background
- Tag background should contrast with main background
- Ensure all text is readable
- All colors must be in HEX format (e.g., #1e1b4b)
- Be creative and try different color combinations each time
- Consider the time of day and season when generating the moodboard

Variation seed: ${randomSeed}`;

  const { object } = await generateObject({
    model: google('gemini-2.0-flash-001'),
    prompt,
    schema: z.object({
      moodTags: z.array(z.string()),
      colors: z.array(z.string().regex(/^#[0-9A-Fa-f]{6}$/)),
      theme: z.object({
        background: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
        text: z.object({
          title: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
          artist: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
        }),
        tag: z
          .object({
            background: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
            text: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
          })
          .optional(),
      }),
    }),
  });

  return object;
}
