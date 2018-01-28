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

export type SearchResult = PodcastResult | EpisodeResult;

export type SearchState = {
  results: HttpRequest<SearchResult[]>;
  suggestions: HttpRequest<string[]>;
  type: SearchType;
};

export type SearchParams = Partial<{
  query: string;
  type: SearchType;
}>;
