import { call, put, select, takeLatest } from 'redux-saga/effects'
import { actions, ActionTypes } from '../redux/actions'
import { getHotClips } from 'api/firebase'
import { getHotClipsPage } from '../selectors'
import mapClipResponse from 'modules/clip/utils/mapClipResponse'

export function* fetchMoreHotClips() {
  const page = yield select(getHotClipsPage)

  try {
    const clips = yield call(getHotClips, page)
    yield put(actions.setPage({ page: page + 1, end: clips.length !== 20 }))
    yield put(actions.addHotClips(clips.map(mapClipResponse)))
  } catch {
    yield put(actions.errorHotClips('Error fetching clips'))
  }
}

export function* watchFetchMoreHotClips() {
  yield takeLatest(ActionTypes.FetchMoreHotClips, fetchMoreHotClips)
}
