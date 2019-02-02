export type PodcastSuggestion = {
  id: string;
  title: string;
  logoUrl: string;
  podcastUrl: string;
};

export type PodcastData = {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  episodes: Episode[];
  website: string;
};

export type Episode = {
  audio: string;
  audioLength: number;
  id: string;
  title: string;
  description: string;
  published: Date;
  thumbnail: string;
};

export type EpisodeClip = {
  audio: string;
  description: string;
  end: number;
  episodeId: string;
  podcastId: string;
  stars: number;
  start: number;
  title: string;
  views: number;
};

export enum PlayStatus {
  Paused = 'paused',
  Playing = 'playing',
  Previewing = 'previewing',
}

export enum PlayMode {
  Playback,
  Share,
}

export type NotAsked = {
  type: 'not_asked';
};

export type Success<T> = {
  type: 'success';
  data: T;
};

export type Fetching = {
  type: 'fetching';
};

export type FetchingWithData<T> = {
  data: T;
  type: 'fetching';
};

export type Error = {
  type: 'error';
  message: string;
};

export type HttpRequest<T> = NotAsked | Fetching | Success<T> | Error;

export type LazyLoadedData<T> = NotAsked | FetchingWithData<T> | Success<T> | Error;
