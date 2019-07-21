import { HttpRequest } from 'src/types';

export enum SearchType {
  Clips = 'clip',
  Episodes = 'episode',
  Podcasts = 'podcast',
}

export type PodcastResult = {
  type: SearchType.Podcasts;
  thumbnail: string;
  title: string;
  id: string;
  description: string;
  publisher: string;
  numEpisodes: number;
};

export type EpisodeResult = {
  type: SearchType.Episodes;
  audioLength: string;
  thumbnail: string;
  title: string;
  id: string;
  podcast: {
    id: string;
    title: string;
  };
  description: string;
  published: Date;
  publisher: string;
};

export type ClipResult = {
  type: SearchType.Clips;
  audioLength: number;
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  podcast: {
    title: string;
  };
  episode: {
    title: string;
  };
  publisher: string;
  published: Date;
};

export type SearchResult = PodcastResult | EpisodeResult | ClipResult;

export type SearchResults<T extends SearchResult> = HttpRequest<{
  results: T[];
  total: number;
}>;

export type SearchState = {
  [SearchType.Podcasts]: SearchResults<PodcastResult>;
  [SearchType.Episodes]: SearchResults<EpisodeResult>;
  [SearchType.Clips]: SearchResults<ClipResult>;
};

export type SearchParams = {
  query: string;
  type: SearchType;
  offset?: number;
};
