import { createSelector } from 'reselect'
import { AppState } from 'redux/types'
import { UserType } from '../types'

const getAuthState = (state: AppState) => state.auth

export const getUserState = createSelector(getAuthState, (state) => state.user)

export const getUserData = createSelector(getUserState, (user) => {
  if (user.type === UserType.Anonymous || user.type === UserType.Permanent) {
    return user.data
  }

  return null
})

export const getUserUid = createSelector(getUserData, (user) => (user ? user.uid : null))
