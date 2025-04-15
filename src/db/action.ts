'use server';

import { db } from '@/db';
import { getUser } from '@/db/data';
import { moodboard } from '@/db/schema';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const SaveMoodboardSchema = z.object({
  trackId: z.string(),
  colors: z.array(z.string()),
  moodTags: z.array(z.string()),
  theme: z.object({
    background: z.string(),
    text: z.object({
      title: z.string(),
      artist: z.string(),
    }),
    tag: z.object({
      background: z.string(),
      text: z.string(),
    }),
  }),
});

export async function saveMoodboard(userId: string, formData: FormData) {
  const user = await getUser();
  if (!user) {
    return {
      error: 'Unauthorized',
    };
  }

  const rawFormData = {
    trackId: formData.get('trackId'),
    colors: (formData.get('colors') as string).split(','),
    moodTags: (formData.get('moodTags') as string).split(','),
    theme: JSON.parse(formData.get('theme') as string),
  };

  const validatedFields = SaveMoodboardSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { trackId, colors, moodTags, theme } = validatedFields.data;

  const data = await db
    .insert(moodboard)
    .values({
      userId,
      trackId,
      colors,
      moodTags,
      theme,
    })
    .returning({ id: moodboard.id });

  if (data.length === 0) {
    console.error('Failed to save moodboard');
    return {
      message: 'Failed to save moodboard',
    };
  }

  revalidateTag(`moodboards:${userId}`);
}
