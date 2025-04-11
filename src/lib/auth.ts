import { db } from '@/db';
import * as schema from '@/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { headers } from 'next/headers';
import { cache } from 'react';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  socialProviders: {
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      scope: ['user-read-email', 'user-top-read', 'user-read-recently-played'],
    },
  },
  session: {
    expiresIn: 3600, // 1 hour
  },
});

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: await headers(),
  });

  return session;
});

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
