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