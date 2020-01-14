import { createAction } from 'redux/createAction'
import { ActionsUnion } from 'redux/types'

export enum ActionTypes {
  SignedInUser = 'auth/signed-in',
  AnonymousUser = 'auth/anonymous',
  Unauthenticated = 'auth/unauthenticated',
}

export const actions = {
  signInUser: (user: firebase.User) => createAction(ActionTypes.SignedInUser, user),
  signInAnonymously: (user: firebase.User) => createAction(ActionTypes.AnonymousUser, user),
  logoutUser: () => createAction(ActionTypes.Unauthenticated),
}

export type Actions = ActionsUnion<typeof actions>
