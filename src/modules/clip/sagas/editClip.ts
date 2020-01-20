import { actions, ActionTypes } from '../redux/actions'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { waitForToken } from 'modules/auth/sagas/waitForToken'
import { editClip as editClipApi } from 'api/firebase'
import { actions as modalActions } from 'modules/modal/redux/actions'
import { getClipId } from '../selectors'

export function* editClip(action: ReturnType<typeof actions.editClip>) {
  const { id: clipId, ...data } = action.payload

  const currentlyLoadedClip = yield select(getClipId)

  yield put(modalActions.modalSend())

  try {
    const token = yield call(waitForToken)
    yield call(editClipApi, { clipId, token, data })
    yield put(
      actions.setMetadata({
        type: 'success',
        data: {
          ...currentlyLoadedClip,
          ...data,
        },
      })
    )
    yield put(modalActions.modalSuccess())
  } catch (e) {
    yield put(modalActions.modalError('Failed to delete clip.'))
  }
}

export function* watchEditClip() {
  yield takeLatest(ActionTypes.EditClip, editClip)
}
