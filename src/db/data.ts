import { db } from '@/db';
import { account, user } from '@/db/schema';
import { getSession } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

export const getUser = cache(async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const data = await db.select().from(user).where(eq(user.id, session.user.id));

  return data[0];
});

export async function getAccessToken(userId: string) {
  const user = await db
    .select({
      accessToken: account.accessToken,
      accessTokenExpiresAt: account.accessTokenExpiresAt,
    })
    .from(account)
    .where(eq(account.userId, userId));

  if (!user[0].accessToken || !user[0].accessTokenExpiresAt) {
    throw new Error('No access token found');
  }

  return {
    accessToken: user[0].accessToken,
    accessTokenExpiresAt: user[0].accessTokenExpiresAt,
  };
}
