export interface GpodderPodcastResponse {
  subscribers: number;
  logo_url: string;
  url: string;
  description: string;
  title: string;
  mygpo_link: string;
  subscribers_last_week: number;
  website: string;
  scaled_logo_url: string;
}

export interface GpodderEpisodeResponse {
  title: string;
  url: string;
  podcast_title: string;
  podcast_url: string;
  description: string;
  website: string;
  released: string;
}

export interface PodcastSuggestion {
  id: string;
  title: string;
  logoUrl: string;
  podcastUrl: string;
}

export interface PodcastData {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  episodes: Episode[];
  website: string;
}

export interface Episode {
  audio: string;
  audioLength: number;
  id: string;
  title: string;
  description: string;
  published: Date;
  thumbnail: string;
}

export enum PlayStatus {
  Paused = 'paused',
  Playing = 'playing',
  Previewing = 'previewing',
}

export enum PlayMode {
  Playback,
  Share,
}

export type HttpRequest<T> = NotAsked | Fetching | Success<T> | Error;

export interface NotAsked {
  type: 'not_asked';
}

export interface Success<T> {
  type: 'success';
  data: T;
}

export interface Fetching {
  type: 'fetching';
}

export interface Error {
  type: 'error';
  message: string;
}
