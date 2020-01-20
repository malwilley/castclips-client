import { createAction } from 'redux/createAction'
import { ActionsUnion } from 'redux/types'
import { UserInfo } from 'firebase'

export enum ActionTypes {
  SignedInUser = 'auth/signed-in',
  AnonymousUser = 'auth/anonymous',
  Unauthenticated = 'auth/unauthenticated',
}

export const actions = {
  signInUser: (user: UserInfo) => createAction(ActionTypes.SignedInUser, user),
  signInAnonymously: (user: UserInfo) => createAction(ActionTypes.AnonymousUser, user),
  logoutUser: () => createAction(ActionTypes.Unauthenticated),
}

export type Actions = ActionsUnion<typeof actions>
