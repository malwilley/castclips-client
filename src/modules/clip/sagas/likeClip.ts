import { actions, ActionTypes } from '../redux/actions'
import { call, put, takeLatest } from 'redux-saga/effects'
import { waitForToken } from 'modules/auth/sagas/waitForToken'
import { unlikeClip as unlikeClipApi, likeClip as likeClipApi } from 'api/firebase'

export function* likeClip(action: ReturnType<typeof actions.likeClip>) {
  const { clipId, like } = action.payload

  yield put(actions.setLikeState(like))

  try {
    const token = yield call(waitForToken)

    yield call(like ? likeClipApi : unlikeClipApi, clipId, token)
  } catch {
    yield put(actions.setLikeState(!like))
  }
}

export function* watchLikeClip() {
  yield takeLatest(ActionTypes.LikeClip, likeClip)
}
