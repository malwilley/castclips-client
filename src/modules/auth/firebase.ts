import firebase from 'firebase/app'
import 'firebase/auth'
import { Store } from 'redux/types'
import { actions } from './redux/actions'
import config from 'config'

const app = firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authHost,
})

const auth = app.auth()

const attachAuthListener = (store: Store) => {
  auth.onAuthStateChanged(user => {
    console.log('auth state changed', user)
    if (user) {
      if (user.isAnonymous) {
        return store.dispatch(actions.signInAnonymously(user))
      }
      return store.dispatch(actions.signInUser(user))
    }

    return store.dispatch(actions.logoutUser())
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
  console.log('getting auth token for', auth.currentUser)
  const user = auth.currentUser

  try {
    if (!user) {
      // Make sure we aren't waiting for the result of a redirect
      await auth.getRedirectResult()
    }
  } catch {
    console.error('Error with signin redirect')
  }

  const token = user ? await user.getIdToken() : await signInAnonymouslyAndGetToken()

  return token
}

export { attachAuthListener, getAuthToken, signInAnonymouslyAndGetToken }
export default app
