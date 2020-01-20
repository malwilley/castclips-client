import { call, put, takeLatest } from 'redux-saga/effects'
import { ActionTypes, actions } from '../redux/actions'
import { actions as modalActions } from 'modules/modal/redux/actions'
import { addClip } from 'api/firebase'
import { waitForToken } from 'modules/auth/sagas/waitForToken'
import { push } from 'connected-react-router'

export function* createClip(action: ReturnType<typeof actions.createClip>) {
  const clip = action.payload

  yield put(modalActions.modalSend())

  try {
    const token = yield call(waitForToken)
    const { id } = yield call(addClip, clip, token)

    yield put(modalActions.modalSuccess())
    yield put(push(`/clip/${id}`))
  } catch {
    yield put(modalActions.modalError('Error creating clip'))
  }
}

export function* watchCreateClip() {
  yield takeLatest(ActionTypes.CreateClip, createClip)
}
