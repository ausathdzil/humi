import { db } from '@/db';
import { account, moodboard, user } from '@/db/schema';
import { getSession } from '@/lib/auth';
import { eq, desc } from 'drizzle-orm';
import { cache } from 'react';
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache';

export const getUser = cache(async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const data = await db.select().from(user).where(eq(user.id, session.user.id));

  return data[0];
});

export const getAccessToken = cache(
  async (userId: string): Promise<string | null> => {
    const user = await db
      .select({
        accessToken: account.accessToken,
        accessTokenExpiresAt: account.accessTokenExpiresAt,
        refreshToken: account.refreshToken,
      })
      .from(account)
      .where(eq(account.userId, userId));

    if (!user.length) {
      throw new Error('No account found for user');
    }

    if (
      !user[0].accessToken ||
      !user[0].accessTokenExpiresAt ||
      !user[0].refreshToken
    ) {
      return null;
    }

    const isExpired = user[0].accessTokenExpiresAt < new Date();

    if (isExpired) {
      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: user[0].refreshToken,
        }).toString(),
      });

      if (!res.ok) {
        throw new Error('Failed to refresh access token');
      }

      const data = await res.json();

      await db
        .update(account)
        .set({
          accessToken: data.access_token,
          accessTokenExpiresAt: data.expires_in,
          refreshToken: data.refresh_token || user[0].refreshToken,
        })
        .where(eq(account.userId, userId));

      return data.access_token;
    }

    return user[0].accessToken;
  }
);

export const getUserMoodboards = async (userId: string) => {
  'use cache';

  cacheLife('hours');
  cacheTag(`moodboards:${userId}`);

  const data = await db
    .select()
    .from(moodboard)
    .where(eq(moodboard.userId, userId))
    .orderBy(desc(moodboard.createdAt));

  return data;
};

export const getMoodboard = async (id: string) => {
  'use cache';

  cacheLife('hours');
  cacheTag(`moodboard:${id}`);

  const data = await db.select().from(moodboard).where(eq(moodboard.id, id));

  return data[0];
};

export const getPublicUser = async (id: string) => {
  'use cache';

  cacheLife('hours');

  const data = await db.select().from(user).where(eq(user.id, id));

  return data[0];
};
