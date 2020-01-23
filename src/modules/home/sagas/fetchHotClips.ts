import { call, put, takeLatest } from 'redux-saga/effects'
import { actions, ActionTypes } from '../redux/actions'
import { getHotClips } from 'api/firebase'
import mapClipResponse from 'modules/clip/utils/mapClipResponse'

export function* fetchHotClips() {
  try {
    const clips = yield call(getHotClips, 1)
    yield put(actions.setPage({ page: 1, end: clips.length !== 20 }))
    yield put(actions.setHotClips({ type: 'success', data: clips.map(mapClipResponse) }))
  } catch {
    yield put(actions.errorHotClips('Error fetching clips'))
  }
}

export function* watchFetchHotClips() {
  yield takeLatest(ActionTypes.FetchHotClips, fetchHotClips)
}
