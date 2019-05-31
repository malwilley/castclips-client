import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';
import firebaseApp from '../firebase';
import Header from '~/modules/header';
import LayoutContainer from '~/components/LayoutContainer';
import { css } from 'emotion';
import { colors, boxShadow } from '~/styles';

const styles = {
  authCenter: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -150,
  }),
  authContainer: css({
    backgroundColor: colors.lightest,
    height: 300,
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    boxShadow: boxShadow.prominent,
  }),
  hero: css({
    background: colors.gradient2,
    height: 400,
    paddingTop: 100,
  }),
  signin: css({
    fontSize: 48,
    marginBottom: 6,
  }),
  textContainer: css({
    color: colors.lightest,
    textAlign: 'center',
  }),
};

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

  return (
    <div>
      <Header />
      <div className={styles.hero}>
        <LayoutContainer className={styles.textContainer}>
          <h2 className={styles.signin}>Sign in</h2>
          <h3>or create an account</h3>
        </LayoutContainer>
      </div>
      <div className={styles.authCenter}>
        <div className={styles.authContainer}>
          <StyledFirebaseAuth firebaseAuth={firebaseApp.auth()} uiConfig={uiConfig} />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
