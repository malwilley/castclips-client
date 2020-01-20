import { applyMiddleware, compose, createStore } from 'redux'
import reducer from './reducer'
import { routerMiddleware } from 'connected-react-router'
import history from './history'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import { prop } from 'ramda'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = prop('__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', window) || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store
