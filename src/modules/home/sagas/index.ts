import { watchFetchHotClips } from './fetchHotClips'
import { watchFetchMoreHotClips } from './fetchMoreHotClips'

const homeSagas = [watchFetchHotClips, watchFetchMoreHotClips]

export default homeSagas
