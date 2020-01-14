import { combineReducers } from 'redux'
import { AuthState, UserData, UserType, UnknownUser, PermanentUser, AnonymousUser } from '../types'
import { Actions, ActionTypes } from './actions'

const mapFirebaseUser = ({
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

const user = (state: AuthState['user'] = { type: UserType.Unknown }, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SignedInUser:
      return {
        type: UserType.Permanent,
        data: mapFirebaseUser(action.payload),
      } as PermanentUser
    case ActionTypes.AnonymousUser:
      return {
        type: UserType.Anonymous,
        data: mapFirebaseUser(action.payload),
      } as AnonymousUser
    case ActionTypes.Unauthenticated:
      return {
        type: UserType.Unknown,
      } as UnknownUser
    default:
      return state
  }
}

const reducer = combineReducers({
  user,
})

export default reducer
