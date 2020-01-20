import { actions, ActionTypes } from '../redux'
import { call, select, put, takeLatest } from 'redux-saga/effects'
import { getPodcastMetadataId } from '../selectors'
import { waitForToken } from 'modules/auth/sagas/waitForToken'
import { getPodcastData } from 'api/firebase'
import mapApiPodcastEpisodes from '../utils/mapApiPodcastEpisode'
import mapApiPodcast from '../utils/mapApiPodcast'

export function* fetchPodcastMetadata(action: ReturnType<typeof actions.fetchPodcastMetadata>) {
  const { payload: id } = action
  const currentlyLoadedPodcastId = yield select(getPodcastMetadataId)
  if (currentlyLoadedPodcastId === id) {
    return
  }

  yield put(actions.setMetadata({ type: 'fetching' }))
  yield put(actions.setEpisodes({ type: 'fetching', data: [] }))

  try {
    const token = yield call(waitForToken)
    const metadata = yield call(getPodcastData, token, id)

    yield put(actions.setMetadata({ type: 'success', data: mapApiPodcast(metadata) }))
    yield put(actions.addEpisodes(mapApiPodcastEpisodes(metadata.episodes)))
    yield put(actions.setEpisodeSearchOffset(metadata.nextEpisodePubDate))
  } catch {
    yield put(actions.setMetadata({ type: 'error', message: 'Error fetching podcast metadata' }))
  }
}

export function* watchFetchPodcastMetadata() {
  yield takeLatest(ActionTypes.FetchPodcastMetadata, fetchPodcastMetadata)
}
