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
  title: string;
  description: string;
  logoUrl: string;
  podcastUrl: string;
}

export interface PodcastData {
  title: string;
  link: string;
  description: string;
  episodes: Episode[];
}

export interface Episode {
  title: string;
  description: string;
  published: number;
  mediaUrl: string;
}

export enum PlayStatus {
  Paused = 'paused',
  Playing = 'playing'
}

export type HttpRequest<T> = 
  NotAsked |
  Fetching |
  Success<T> | 
  Error;

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