import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Store, AppState } from '~/redux/types';
import { actions } from './redux/actions';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCDNk16gnJo4FHVLfqD-l_vEYZH8MCkcJo',
  authDomain: 'castclips-7c579.firebaseapp.com',
});

const attachAuthListener = (store: Store) => {
  app.auth().onAuthStateChanged(user => {
    if (user) {
      if (user.isAnonymous) {
        return store.dispatch(
          actions.setUser({
            type: 'anonymous',
            user,
          })
        );
      }
      return store.dispatch(
        actions.setUser({
          type: 'loggedin',
          user,
        })
      );
    }

    return store.dispatch(
      actions.setUser({
        type: 'loggedout',
      })
    );
  });
};

const signInAnonymouslyAndGetToken = async () => {
  const { user } = await firebase.auth().signInAnonymouslyAndRetrieveData();
  if (!user) {
    throw new Error('Failed to login');
  }

  const token = await user.getIdToken();
  return token;
};

const getAuthToken = async (state: AppState) => {
  const userState = state.auth.user;
  const token =
    userState.type === 'loggedout'
      ? await signInAnonymouslyAndGetToken()
      : await userState.user.getIdToken();

  return token;
};

export { attachAuthListener, getAuthToken, signInAnonymouslyAndGetToken };
export default app;
