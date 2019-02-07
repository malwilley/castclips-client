import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import history from './history';

const store = createStore(
  reducer,
  applyMiddleware(routerMiddleware(history), createLogger(), thunk)
);

export default store;
