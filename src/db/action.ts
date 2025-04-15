'use server';

import { db } from '@/db';
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function saveMoodboard(
  userId: string | undefined,
  prevState: any,
  formData: FormData
) {
  if (!userId) {
    return {
      success: false,
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
    return {
      success: false,
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
    return {
      success: false,
      message: 'Failed to save moodboard',
    };
  }

  revalidateTag(`moodboards:${userId}`);

  return {
    success: true,
    message: 'Moodboard saved successfully',
  };
}
