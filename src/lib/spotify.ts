import { unstable_cacheLife as cacheLife } from 'next/cache';
import { RecentlyPlayedResponse, TopTracksResponse } from './spotify.types';

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

  const data = await res.json();

  return data;
}
