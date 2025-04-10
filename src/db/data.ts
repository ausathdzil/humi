import { db } from '@/db';
import { Account, account } from '@/db/schema';
import { Session } from 'better-auth';
import { eq } from 'drizzle-orm';

export async function getAccount(session: Session): Promise<Account> {
  'use cache';

  const data = await db
    .select()
    .from(account)
    .where(eq(account.userId, session?.userId as string));

  return data[0];
}

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
