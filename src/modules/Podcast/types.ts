import { LazyLoadedData, HttpRequest } from '~/types';
import { GetClipsForEpisodeResponse } from '~/api/firebase';

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
  publisher: string;
  website: string;
};

export type PodcastState = {
  clips: HttpRequest<GetClipsForEpisodeResponse>;
  episodes: LazyLoadedEpisodes;
  metadata: HttpRequest<PodcastMetadata>;
};
