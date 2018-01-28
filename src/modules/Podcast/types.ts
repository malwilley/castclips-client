import { LazyLoadedData, HttpRequest } from 'src/types';
import {
  GetClipsForPodcastResponse,
  PodcastMetadataResponse,
  PodcastEpisodeResponse,
} from 'src/api/types';

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

export type PodcastClip = Merge<
  GetClipsForPodcastResponse,
  {
    episode: {
      id: string;
      title: string;
      description: string;
      audioLength: number;
      published: Date;
    };
    published: Date;
  }
>;

export type PodcastState = {
  clips: HttpRequest<PodcastClip[]>;
  episodes: LazyLoadedEpisodes;
  metadata: HttpRequest<PodcastMetadata>;
};
