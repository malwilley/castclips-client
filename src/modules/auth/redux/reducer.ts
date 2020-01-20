import { combineReducers } from 'redux'
import {
  AuthState,
  UserData,
  UserType,
  PermanentUser,
  AnonymousUser,
  UnauthenticatedUser,
} from '../types'
import { Actions, ActionTypes } from './actions'
import { UserInfo } from 'firebase'

const mapFirebaseUser = ({ displayName, email, photoURL, uid }: UserInfo): UserData => ({
  displayName: displayName ?? '',
  email: email ?? '',
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
        type: UserType.Unauthenticated,
      } as UnauthenticatedUser
    default:
      return state
  }
}

const reducer = combineReducers({
  user,
})

export default reducer
