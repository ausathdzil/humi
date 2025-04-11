import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractSpotifyTrackId(input: string): string | null {
  // Regular expression to match Spotify track URLs
  const spotifyTrackRegex =
    /^https:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)(?:\?.*)?$/;

  // Check if input is a URL
  if (input.startsWith('https://open.spotify.com/track/')) {
    const match = input.match(spotifyTrackRegex);
    return match ? match[1] : null;
  }

  // If it's not a URL, assume it's already an ID
  // Spotify track IDs are 22 characters long and contain alphanumeric characters
  const idRegex = /^[a-zA-Z0-9]{22}$/;
  return idRegex.test(input) ? input : null;
}
