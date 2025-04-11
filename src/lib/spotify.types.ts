export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Restrictions {
  reason: 'market' | 'product' | 'explicit';
}

export interface SimplifiedArtist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  restrictions?: Restrictions;
  type: 'album';
  uri: string;
  artists: SimplifiedArtist[];
}

export interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface LinkedFrom {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: 'track';
  uri: string;
}

export interface Track {
  album: Album;
  artists: SimplifiedArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: LinkedFrom;
  restrictions?: Restrictions;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
  is_local: boolean;
}

export interface TopTracksResponse {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Track[];
}

export interface RecentlyPlayedResponse {
  href: string;
  limit: number;
  next: string | null;
  cursors: {
    after: string;
    before: string;
  };
  total: number;
  items: {
    track: Track;
    played_at: string;
    context: {
      type: string;
      href: string;
      external_urls: ExternalUrls;
      uri: string;
    };
  }[];
}
