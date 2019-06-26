import { LazyLoadedData, HttpRequest } from 'src/types';
import { PodcastMetadataResponse, PodcastEpisodeResponse } from 'src/api/types';
import { ClipMetadata } from '../clip/types';

export type PodcastEpisode = Merge<
  PodcastEpisodeResponse,
  {
    published: Date;
  }
>;

export type LazyLoadedEpisodes =
  | LazyLoadedData<PodcastEpisode[]>
  | { data: PodcastEpisode[]; type: 'end' };

export type PodcastMetadata = Omit<PodcastMetadataResponse, 'episodes'>;

export type PodcastState = {
  clips: HttpRequest<ClipMetadata[]>;
  episodes: LazyLoadedEpisodes;
  metadata: HttpRequest<PodcastMetadata>;
};
