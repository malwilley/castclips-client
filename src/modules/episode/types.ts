import { HttpRequest } from 'src/types';
import { PodcastMetadata } from '../podcast/types';
import { EpisodeMetadataResponse } from 'src/api/types';
import { ClipMetadata } from '../clip/types';

type EpisodePodcast = Pick<
  PodcastMetadata,
  'id' | 'description' | 'title' | 'thumbnail' | 'website'
>;

export type EpisodeMetadata = Merge<
  EpisodeMetadataResponse,
  {
    podcast: EpisodePodcast;
    published: Date;
  }
>;

export type EpisodeView = {
  clipId: HttpRequest<string>;
};

export type EpisodeState = {
  clips: HttpRequest<ClipMetadata[]>;
  metadata: HttpRequest<EpisodeMetadata>;
  view: EpisodeView;
};
