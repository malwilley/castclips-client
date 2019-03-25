import { HttpRequest } from '~/types';

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
};

export type EpisodeResult = {
  type: SearchType.Episodes;
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
