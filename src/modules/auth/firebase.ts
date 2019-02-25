import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Store } from '~/redux/types';
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

export { attachAuthListener };
export default app;
