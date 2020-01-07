export type UserData = {
  displayName: string
  email: string
  emailVerified: boolean
  creationTime?: string
  lastSignInTime?: string
  photoUrl: string | null
  refreshToken: string
  uid: string
}

export type UserLoggedIn = {
  type: 'loggedin'
  data: UserData
}

export type UserLoggedOut = {
  type: 'loggedout'
  data: null
}

export type AnonymousUser = {
  type: 'anonymous'
  data: UserData
}

type UserState = UserLoggedIn | UserLoggedOut | AnonymousUser

export type AuthState = {
  user: UserState
}
