import { actions, ActionTypes } from '../redux/actions'
import { call, put, takeLatest } from 'redux-saga/effects'
import { waitForToken } from 'modules/auth/sagas/waitForToken'
import { getClip } from 'api/firebase'
import mapClipResponse from '../utils/mapClipResponse'

export function* fetchClip(action: ReturnType<typeof actions.fetchClip>) {
  const id = action.payload

  yield put(actions.setMetadata({ type: 'fetching' }))

  try {
    const token = yield call(waitForToken)
    const clip = yield call(getClip, id, token)
    yield put(
      actions.setMetadata({
        type: 'success',
        data: mapClipResponse(clip),
      })
    )
  } catch (e) {
    console.error(e)
    yield put(actions.setMetadata({ type: 'error', message: 'Error fetching episode metadata' }))
  }
}

export function* watchFetchClip() {
  yield takeLatest(ActionTypes.FetchClip, fetchClip)
}
