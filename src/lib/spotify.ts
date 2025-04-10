import { unstable_cacheLife as cacheLife } from 'next/cache';
import {
  RecentlyPlayedResponse,
  TopTracksResponse,
  Track,
} from './spotify.types';

async function getClientAccessToken(): Promise<string> {
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

  const data = await res.json();
  return data.access_token;
}

export async function getTrack(
  trackId: string,
  accessToken?: string
): Promise<Track> {
  'use cache';

  cacheLife('hours');

  const token = accessToken || (await getClientAccessToken());

  const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch track');

  return res.json();
}

export async function getTopTracks(
  accessToken: string
): Promise<TopTracksResponse> {
  'use cache';

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

  cacheLife('minutes');

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
