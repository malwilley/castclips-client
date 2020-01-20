import firebase from 'firebase/app'
import 'firebase/auth'
import config from 'config'

const app = firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authHost,
})

const auth = app.auth()

export { auth }
export default app
