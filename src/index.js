import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'ace-css';
import * as firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  authDomain: 'castclips-7c579.firebaseapp.com',
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
