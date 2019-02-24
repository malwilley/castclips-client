import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import history from './history';
import { attachAuthListener } from '~/modules/auth/firebase';

const store = createStore(
  reducer,
  applyMiddleware(routerMiddleware(history), createLogger(), thunk)
);

attachAuthListener(store);

export default store;
