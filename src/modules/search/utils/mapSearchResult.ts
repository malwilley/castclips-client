import { SearchType, PodcastResult, EpisodeResult, ClipResult } from '../types'

const mapPodcastResult = (result: PodcastResult) => ({
  ...result,
  type: SearchType.Podcasts,
})

const mapEpisodeResult = (result: EpisodeResult) => ({
  ...result,
  published: new Date(result.published),
  type: SearchType.Episodes,
})

const mapClipResult = (result: ClipResult) => ({
  ...result,
  published: new Date(result.published),
  type: SearchType.Clips,
})

const makeMapSearchResult = (type: SearchType) => (
  result: PodcastResult | EpisodeResult | ClipResult
): any => {
  switch (type) {
    case SearchType.Clips:
      return mapClipResult(result as ClipResult)
    case SearchType.Episodes:
      return mapEpisodeResult(result as EpisodeResult)
    case SearchType.Podcasts:
      return mapPodcastResult(result as PodcastResult)
    default:
      return {}
  }
}

export { mapPodcastResult, mapEpisodeResult }
export default makeMapSearchResult
