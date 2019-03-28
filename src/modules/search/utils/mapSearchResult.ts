import { SearchType, PodcastResult, EpisodeResult } from '../types';

const mapPodcastResult = (result: PodcastResult) => ({
  ...result,
  type: SearchType.Podcasts,
});

const mapEpisodeResult = (result: EpisodeResult) => ({
  ...result,
  published: new Date(result.published),
  type: SearchType.Episodes,
});

const makeMapSearchResult = (type: SearchType) => (result: PodcastResult | EpisodeResult): any => {
  if (type === SearchType.Episodes) {
    return mapEpisodeResult(result as EpisodeResult);
  }

  return mapPodcastResult(result as PodcastResult);
};

export { mapPodcastResult, mapEpisodeResult };
export default makeMapSearchResult;
