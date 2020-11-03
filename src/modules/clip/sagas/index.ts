import { watchDeleteClip } from './deleteClip'
import { watchEditClip } from './editClip'
import { watchFetchClip } from './fetchClip'
import { watchLikeClip } from './likeClip'

const clipSagas = [watchDeleteClip, watchEditClip, watchFetchClip, watchLikeClip]

export default clipSagas
