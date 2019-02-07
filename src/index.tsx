import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '~/App';
import './index.css';
import registerServiceWorker from '~/registerServiceWorker';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ConnectedRouter } from 'connected-react-router';
import history from './redux/history';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
