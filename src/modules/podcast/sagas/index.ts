import { watchClearEpisodeSearch } from './clearEpisodeSearch'
import { watchFetchClipsForPodcast } from './fetchClipsForPodcast'
import { watchFetchMoreEpisodes } from './fetchMoreEpisodes'
import { watchFetchPodcastMetadata } from './fetchPodcastMetadata'
import { watchSearchPodcastEpisodes } from './searchPodcastEpisodes'

export default [
  watchClearEpisodeSearch,
  watchFetchClipsForPodcast,
  watchFetchMoreEpisodes,
  watchFetchPodcastMetadata,
  watchSearchPodcastEpisodes,
]
