import { HttpRequest } from 'src/types';
import { PodcastMetadata } from '../Podcast/types';
import { EpisodeClipResponse, EpisodeMetadataResponse } from 'src/api/types';

type EpisodePodcast = Pick<
  PodcastMetadata,
  'id' | 'description' | 'title' | 'thumbnail' | 'website'
>;

export type EpisodeClip = Merge<
  EpisodeClipResponse,
  {
    published: Date;
  }
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
  clips: HttpRequest<EpisodeClip[]>;
  metadata: HttpRequest<EpisodeMetadata>;
  view: EpisodeView;
};
