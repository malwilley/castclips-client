export type GetClipResponse = {
  audio: string;
  description: string;
  end: number;
  episode: {
    id: string;
    title: string;
    description: string;
    audioLength: number;
    published: string;
  };
  podcast: { id: string; title: string; description: string; thumbnail: string };
  published: string;
  stars: number;
  start: number;
  title: string;
  views: number;
};

export type AddClipPayload = {
  audio: string;
  description: string;
  end: number;
  episode: {
    id: string;
    title: string;
    description: string;
    audioLength: number;
    published: Date;
    thumbnail: string;
  };
  podcast: { id: string; title: string; description: string; thumbnail: string };
  start: number;
  title: string;
};

export type GetClipsForPodcastResponse = {
  audio: string;
  description: string;
  id: string;
  end: number;
  episode: {
    id: string;
    title: string;
    description: string;
    audioLength: number;
    published: string;
  };
  published: string;
  stars: number;
  start: number;
  title: string;
  views: number;
};

export type GetClipsForEpisodeResponse = Array<{
  audio: string;
  description: string;
  id: string;
  end: number;
  published: string;
  stars: number;
  start: number;
  title: string;
  views: number;
}>;

export type AddClipResponse = {
  id: string;
};

export type EpisodeClipResponse = {
  audio: string;
  description: string;
  id: string;
  end: number;
  published: string;
  stars: number;
  start: number;
  title: string;
  views: number;
};

export type PodcastEpisodeResponse = {
  audioLength: number;
  description: string;
  id: string;
  title: string;
  thumbnail: string;
  published: string;
};

export type PodcastMetadataResponse = {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  totalEpisodes: number;
  publisher: string;
  website: string;
  episodes: PodcastEpisodeResponse[];
};

export type EpisodePodcast = Pick<
  PodcastMetadataResponse,
  'id' | 'description' | 'title' | 'thumbnail' | 'website'
>;

export type EpisodeMetadataResponse = {
  audio: string;
  audioLength: number;
  id: string;
  title: string;
  description: string;
  podcast: EpisodePodcast;
  published: string;
  thumbnail: string;
};

export type PodcastSuggestionResponse = {
  id: string;
  title: string;
  thumbnail: string;
  podcastUrl: string;
};

export type TypeaheadResponse = {
  terms: string[];
};

export type SearchResultsResponse<T> = {
  count: number;
  total: number;
  results: T[];
};

export type SearchResultEpisodeResponse = {
  description: string;
  id: string;
  podcast: {
    id: string;
    title: string;
  };
  thumbnail: string;
  title: string;
};

export type SearchResultPodcastResponse = {
  description: string;
  id: string;
  publisher: string;
  thumbnail: string;
  title: string;
};
