import { LazyLoadedData, HttpRequest } from '~/types';

export type PodcastEpisode = {
  audioLength: number;
  description: string;
  id: string;
  title: string;
  thumbnail: string;
  published: Date;
};

export type LazyLoadedEpisodes =
  | LazyLoadedData<PodcastEpisode[]>
  | { data: PodcastEpisode[]; type: 'end' };

export type PodcastMetadata = {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  totalEpisodes: number;
  website: string;
};

export type PodcastState = {
  episodes: LazyLoadedEpisodes;
  metadata: HttpRequest<PodcastMetadata>;
};
