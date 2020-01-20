export enum UserType {
  Anonymous = 'anonymous',
  Unknown = 'unknown',
  Unauthenticated = 'unauthenticated',
  Permanent = 'permanent',
}

export type UserData = {
  displayName: string
  email: string
  photoUrl: string | null
  uid: string
}

export type UnauthenticatedUser = {
  type: UserType.Unauthenticated
}

export type PermanentUser = {
  type: UserType.Permanent
  data: UserData
}

export type UnknownUser = {
  type: UserType.Unknown
}

export type AnonymousUser = {
  type: UserType.Anonymous
  data: UserData
}

export type UserState = PermanentUser | UnknownUser | AnonymousUser | UnauthenticatedUser

export type AuthState = {
  user: UserState
}
