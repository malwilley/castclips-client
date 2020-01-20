import { actions, ActionTypes } from '../redux/actions'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { waitForToken } from 'modules/auth/sagas/waitForToken'
import { deleteClip as deleteClipApi } from 'api/firebase'
import { actions as modalActions } from 'modules/modal/redux/actions'
import { push } from 'connected-react-router'
import { getClipId } from '../selectors'

export function* deleteClip(action: ReturnType<typeof actions.deleteClip>) {
  const clipId = action.payload

  const currentlyLoadedClip = yield select(getClipId)

  yield put(modalActions.modalSend())

  try {
    const token = yield call(waitForToken)
    yield call(deleteClipApi, { clipId, token })
    yield put(push(`/episode/${currentlyLoadedClip.episode.id}`))
  } catch (e) {
    yield put(modalActions.modalError('Failed to delete clip.'))
  }
}

export function* watchDeleteClip() {
  yield takeLatest(ActionTypes.DeleteClip, deleteClip)
}
