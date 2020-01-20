import { call, put, takeLatest } from 'redux-saga/effects'
import { ActionTypes, actions } from '../redux/actions'
import { getClipsForEpisode } from 'api/firebase'
import mapClipResponse from 'modules/clip/utils/mapClipResponse'

export function* fetchEpisodeClips(action: ReturnType<typeof actions.fetchEpisodeClips>) {
  const id = action.payload
  yield put(actions.setClips({ type: 'fetching' }))

  try {
    const clips = yield call(getClipsForEpisode, id)
    yield put(
      actions.setClips({
        data: clips.map(mapClipResponse),
        type: 'success',
      })
    )
  } catch {
    yield put(actions.setClips({ message: 'Error fetching clips', type: 'error' }))
  }
}

export function* watchFetchEpisodeClips() {
  yield takeLatest(ActionTypes.FetchEpisodeClips, fetchEpisodeClips)
}
