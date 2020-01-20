import { applyMiddleware, createStore } from 'redux'
import reducer from './reducer'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import history from './history'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(routerMiddleware(history), createLogger(), sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store
