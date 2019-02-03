import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(reducer, applyMiddleware(createLogger(), thunk));

export default store;
