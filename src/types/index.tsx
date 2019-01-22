export type GpodderPodcastResponse = {
  subscribers: number;
  logo_url: string;
  url: string;
  description: string;
  title: string;
  mygpo_link: string;
  subscribers_last_week: number;
  website: string;
  scaled_logo_url: string;
};

export type GpodderEpisodeResponse = {
  title: string;
  url: string;
  podcast_title: string;
  podcast_url: string;
  description: string;
  website: string;
  released: string;
};

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

export type HttpRequest<T> = NotAsked | Fetching | Success<T> | Error;

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

export type Error = {
  type: 'error';
  message: string;
};
