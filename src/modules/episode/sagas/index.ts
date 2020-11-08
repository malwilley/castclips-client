import { watchCreateClip } from './createClip'
import { watchFetchEpisodeClips } from './fetchEpisodeClips'
import { watchFetchEpisode } from './fetchEpisode'

const episodeSagas = [watchCreateClip, watchFetchEpisodeClips, watchFetchEpisode]

export default episodeSagas
