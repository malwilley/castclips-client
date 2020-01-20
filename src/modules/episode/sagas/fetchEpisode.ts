import { call, put, select, takeLatest } from 'redux-saga/effects'
import { ActionTypes, actions } from '../redux/actions'
import { getEpisodeData } from 'api/firebase'
import { getEpisodeId } from '../selectors'
import { waitForToken } from 'modules/auth/sagas/waitForToken'
import mapApiEpisode from '../utils/mapApiEpisode'

export function* fetchEpisode(action: ReturnType<typeof actions.fetchEpisode>) {
  const id = action.payload

  const loadedEpisodeId = yield select(getEpisodeId)

  if (loadedEpisodeId === id) {
    return
  }

  yield put(actions.setMetadata({ type: 'fetching' }))

  try {
    const token = yield call(waitForToken)
    const metadata = yield call(getEpisodeData, token, id)
    yield put(actions.setMetadata({ type: 'success', data: mapApiEpisode(metadata) }))
  } catch {
    yield put(actions.setMetadata({ type: 'error', message: 'Error fetching episode metadata' }))
  }
}

export function* watchFetchEpisode() {
  yield takeLatest(ActionTypes.FetchEpisode, fetchEpisode)
}
