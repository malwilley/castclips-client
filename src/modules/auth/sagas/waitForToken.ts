import { call, select, take } from 'redux-saga/effects'
import { getUserState } from '../selectors'
import { UserState, UserType } from '../types'
import { auth } from '../firebase'
import { ActionTypes } from '../redux/actions'

const signInAnonymouslyAndGetToken = async () => {
  const { user } = await auth.signInAnonymously()

  if (!user) {
    throw new Error('Failed to login')
  }

  const token = user.getIdToken()

  return token
}

const getToken = async () => {
  const token = await auth.currentUser!.getIdToken()
  return token
}

export function* waitForToken(): Generator<any, string, any> {
  const userState: UserState = yield select(getUserState)

  switch (userState.type) {
    case UserType.Anonymous:
    case UserType.Permanent: {
      return yield call(getToken)
    }
    case UserType.Unauthenticated: {
      return yield call(signInAnonymouslyAndGetToken)
    }
    case UserType.Unknown: {
      yield take([ActionTypes.AnonymousUser, ActionTypes.SignedInUser, ActionTypes.Unauthenticated])
      return yield call(waitForToken)
    }
  }
}
