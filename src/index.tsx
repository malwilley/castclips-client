import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store from './redux/store'
import history from './redux/history'
import { injectGlobal } from 'emotion'
import global from 'styles/global'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import config from 'config'

Sentry.init({
  dsn: config.sentry.dsn,
  integrations: [new BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: config.sentry.tracesSampleRate,
  replaysSessionSampleRate: config.sentry.replaysSessionSampleRate,
  replaysOnErrorSampleRate: config.sentry.replaysOnErrorSampleRate,
})

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

injectGlobal(global)
