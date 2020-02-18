import { actions, ActionTypes } from '../redux'
import { call, select, put, takeLatest } from 'redux-saga/effects'
import { getPodcastMetadataId } from '../selectors'
import { waitForToken } from 'modules/auth/sagas/waitForToken'
import { getPodcastData } from 'api/firebase'
import mapApiPodcastEpisodes from '../utils/mapApiPodcastEpisode'

export function* clearEpisodeSearch() {
  const loadedPodcastId = yield select(getPodcastMetadataId)
  if (!loadedPodcastId) {
    return
  }

  yield put(actions.setEpisodes({ type: 'fetching', data: [] }))

  try {
    const token = yield call(waitForToken)
    const { nextEpisodePubDate, episodes } = yield call(getPodcastData, token, loadedPodcastId)
    const newEpisodesList = mapApiPodcastEpisodes(episodes)

    nextEpisodePubDate
      ? yield put(actions.setEpisodes({ type: 'success', data: newEpisodesList }))
      : yield put(actions.setEpisodes({ type: 'end', data: newEpisodesList }))

    yield put(actions.setEpisodeSearchOffset(nextEpisodePubDate))
  } catch {
    yield put(
      actions.setEpisodes({
        type: 'error',
        data: [],
        message: 'Error fetching new episodes',
      })
    )
  }
}

export function* watchClearEpisodeSearch() {
  yield takeLatest(ActionTypes.ClearPodcastEpisodeSearch, clearEpisodeSearch)
}
