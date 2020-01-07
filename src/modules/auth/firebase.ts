import firebase from 'firebase/app'
import 'firebase/auth'
import { Store } from 'redux/types'
import { actions } from './redux/actions'
import { UserData } from './types'
import config from 'config'

const app = firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authHost,
})

const auth = app.auth()

const mapUser = ({
  displayName,
  email,
  emailVerified,
  metadata: { creationTime, lastSignInTime },
  refreshToken,
  photoURL,
  uid,
}: firebase.User): UserData => ({
  displayName: displayName || '',
  email: email || '',
  emailVerified,
  creationTime,
  lastSignInTime,
  refreshToken,
  photoUrl: photoURL,
  uid,
})

const attachAuthListener = (store: Store) => {
  auth.onAuthStateChanged(user => {
    if (user) {
      if (user.isAnonymous) {
        return store.dispatch(
          actions.setUser({
            type: 'anonymous',
            data: mapUser(user),
          })
        )
      }
      return store.dispatch(
        actions.setUser({
          type: 'loggedin',
          data: mapUser(user),
        })
      )
    }

    return store.dispatch(
      actions.setUser({
        type: 'loggedout',
        data: null,
      })
    )
  })
}

const signInAnonymouslyAndGetToken = async () => {
  const { user } = await auth.signInAnonymously()
  if (!user) {
    throw new Error('Failed to login')
  }

  const token = await user.getIdToken()
  return token
}

const getAuthToken = async () => {
  const user = auth.currentUser
  const token = user ? await user.getIdToken() : await signInAnonymouslyAndGetToken()

  return token
}

export { attachAuthListener, getAuthToken, signInAnonymouslyAndGetToken }
export default app
