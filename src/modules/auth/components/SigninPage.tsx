import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';
import firebaseApp from '../firebase';

const SigninPage: React.FC = () => {
  // get url params from redux (redirect)
  const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  return <StyledFirebaseAuth firebaseAuth={firebaseApp.auth()} uiConfig={uiConfig} />;
};

export default SigninPage;
