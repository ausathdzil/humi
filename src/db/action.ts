/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { db } from '@/db';
import { moodboard } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';

const SaveMoodboardSchema = z.object({
  title: z.string(),
  artists: z.array(z.string()),
  albumCover: z.string(),
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
    title: formData.get('title'),
    artists: (formData.get('artists') as string).split(','),
    albumCover: formData.get('albumCover'),
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

  const { title, artists, albumCover, trackId, colors, moodTags, theme } =
    validatedFields.data;

  const data = await db
    .insert(moodboard)
    .values({
      userId,
      trackId,
      title,
      artists,
      albumCover,
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
    message: 'Moodboard saved',
  };
}

const DeleteMoodboardSchema = z.object({
  id: z.string(),
});

export async function deleteMoodboard(
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
    id: formData.get('id'),
  };

  const validatedFields = DeleteMoodboardSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid moodboard ID',
    };
  }

  const { id } = validatedFields.data;

  const data = await db
    .delete(moodboard)
    .where(eq(moodboard.id, id))
    .returning({ id: moodboard.id });

  if (data.length === 0) {
    return {
      success: false,
      message: 'Failed to delete moodboard',
    };
  }

  revalidateTag(`moodboards:${userId}`);
  revalidatePath('/profile/moodboards');

  return {
    success: true,
    message: 'Moodboard deleted',
  };
}
