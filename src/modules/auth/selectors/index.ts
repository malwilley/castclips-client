import { createSelector } from 'reselect';
import { AppState } from 'redux/types';

const getAuthState = (state: AppState) => state.auth;

export const getUserState = createSelector(getAuthState, state => state.user);

export const getUserUid = createSelector(getUserState, user => {
  if (user.type === 'anonymous' || user.type === 'loggedin') {
    return user.data.uid;
  }

  return null;
});
