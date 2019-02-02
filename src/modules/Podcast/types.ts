import { LazyLoadedData, HttpRequest } from '~/types';

export type PodcastEpisode = {
  description: string;
  id: string;
  name: string;
  thumbnail: string;
};

export type LazyLoadedEpisodes =
  | LazyLoadedData<PodcastEpisode[]>
  | { data: PodcastEpisode[]; type: 'end' };

export type PodcastMetadata = {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  website: string;
};

export type PodcastState = {
  episodes: LazyLoadedEpisodes;
  metadata: HttpRequest<PodcastMetadata>;
};
