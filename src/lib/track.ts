import { TopTracksResponse } from './track.types';

export async function getTopTracks(accessToken: string): Promise<TopTracksResponse> {
  'use cache';

  const res = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  
  return data;
}