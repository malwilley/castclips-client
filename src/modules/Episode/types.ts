import { HttpRequest } from '~/types';
import { PodcastMetadata } from '../Podcast/types';

type EpisodePodcast = Pick<
  PodcastMetadata,
  'id' | 'description' | 'title' | 'thumbnail' | 'website'
>;

export type EpisodeClip = {
  audio: string;
  description: string;
  id: string;
  end: number;
  published: Date;
  stars: number;
  start: number;
  title: string;
  views: number;
};

export type EpisodeMetadata = {
  audio: string;
  audioLength: number;
  id: string;
  title: string;
  description: string;
  podcast: EpisodePodcast;
  published: Date;
  thumbnail: string;
};

export type EpisodeView = {
  clipId: HttpRequest<string>;
};

export type EpisodeState = {
  clips: HttpRequest<EpisodeClip[]>;
  metadata: HttpRequest<EpisodeMetadata>;
  view: EpisodeView;
};
