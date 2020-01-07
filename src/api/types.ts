export type GetClipResponse = {
  audio: string
  createdAt: number
  updatedAt: number
  description: string
  end: number
  episode: {
    id: string
    title: string
    description: string
    audioLength: number
    published: string
  }
  id: string
  podcast: { id: string; title: string; description: string; thumbnail: string }
  published: string
  likesCount: number
  stars: number
  start: number
  title: string
  userHasLiked: boolean
  views: number
  userId: string
}

export type AddClipPayload = {
  audio: string
  description: string
  end: number
  episode: {
    id: string
    title: string
    description: string
    audioLength: number
    published: Date
    thumbnail: string
  }
  podcast: { id: string; title: string; description: string; thumbnail: string }
  start: number
  title: string
}

export type GetHotClipsResponse = GetClipResponse[]

export type GetClipsForPodcastResponse = GetClipResponse[]

export type GetClipsForEpisodeResponse = GetClipResponse[]

export type AddClipResponse = {
  id: string
}

export type EpisodeClipResponse = GetClipResponse

export type PodcastEpisodeResponse = {
  audioLength: number
  description: string
  id: string
  title: string
  thumbnail: string
  published: string
}

export type PodcastMetadataResponse = {
  description: string
  episodes: PodcastEpisodeResponse[]
  id: string
  nextEpisodePubDate: number
  publisher: string
  thumbnail: string
  title: string
  totalEpisodes: number
  website: string
}

export type EpisodePodcast = Pick<
  PodcastMetadataResponse,
  'id' | 'description' | 'title' | 'thumbnail' | 'website'
>

export type EpisodeMetadataResponse = {
  audio: string
  audioLength: number
  id: string
  title: string
  description: string
  podcast: EpisodePodcast
  published: string
  thumbnail: string
}

export type PodcastSuggestionResponse = {
  id: string
  title: string
  thumbnail: string
  podcastUrl: string
}

export type TypeaheadResponse = {
  terms: string[]
}

export type SearchResultsResponse<T> = {
  count: number
  nextOffset: number
  results: T[]
  total: number
}

export type SearchResultEpisodeResponse = {
  description: string
  id: string
  podcast: {
    id: string
    title: string
  }
  thumbnail: string
  title: string
}

export type SearchResultPodcastResponse = {
  description: string
  id: string
  publisher: string
  thumbnail: string
  title: string
}
