import { eventChannel } from 'redux-saga'
import { put, take } from 'redux-saga/effects'
import { auth } from '../firebase'
import { UserType } from '../types'
import { actions } from '../redux/actions'
import { UserInfo } from 'firebase'
import { pick } from 'ramda'

const getUserData = pick(['uid', 'displayName', 'email', 'photoURL', 'phoneNumber', 'providerId'])

const authStateChannel = eventChannel<{ type: UserType; data?: UserInfo }>(emitter => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    console.log('auth state changed', user)
    if (user) {
      if (user.isAnonymous) {
        return emitter({ type: UserType.Anonymous, data: getUserData(user) })
      }

      return emitter({ type: UserType.Permanent, data: getUserData(user) })
    }

    emitter({ type: UserType.Unauthenticated })
  })

  return unsubscribe
})

export function* updateAuthState() {
  while (true) {
    const authUpdate: { type: UserType; data?: UserInfo } = yield take(authStateChannel)

    switch (authUpdate.type) {
      case UserType.Anonymous:
        yield put(actions.signInAnonymously(authUpdate.data!))
        break
      case UserType.Permanent:
        yield put(actions.signInUser(authUpdate.data!))
        break
      case UserType.Unauthenticated:
        yield put(actions.logoutUser())
        break
    }
  }
}
