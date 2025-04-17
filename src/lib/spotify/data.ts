/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  RecentlyPlayedResponse,
  TopTracksResponse,
  Track,
} from '@/lib/spotify/types';
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache';

async function getClientAccessToken(): Promise<string | null> {
  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }).toString(),
    });

    if (!res.ok) throw new Error('Failed to fetch client access token');

    const data = await res.json();
    return data.access_token;
  } catch (error) {
    return null;
  }
}

export async function getTrack(
  trackId: string,
  accessToken?: string
): Promise<Track | null> {
  'use cache';

  cacheTag('track');
  cacheLife('hours');

  const token = accessToken || (await getClientAccessToken());

  if (!token) return null;

  try {
    const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch track');

    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getTopTracks(
  accessToken: string
): Promise<TopTracksResponse> {
  'use cache';

  cacheTag('top-tracks');
  cacheLife('hours');

  const res = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch top tracks');

  const data = await res.json();

  return data;
}

export async function getRecentlyPlayed(
  accessToken: string
): Promise<RecentlyPlayedResponse> {
  'use cache';

  cacheTag('recently-played');
  cacheLife('hours');

  const res = await fetch(
    'https://api.spotify.com/v1/me/player/recently-played?limit=5',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) throw new Error('Failed to fetch recently played');

  const data = await res.json();

  return data;
}
