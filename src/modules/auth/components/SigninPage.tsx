import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import firebaseApp from '../firebase';
import Header from 'src/modules/header';
import LayoutContainer from 'src/components/LayoutContainer';
import { css } from 'emotion';
import { colors } from 'src/styles';
import BoxContainer from 'src/components/BoxContainer';
import Card from 'src/components/Card';
import zIndex from 'src/styles/zIndex';

const styles = {
  authCenter: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -250,
  }),
  authContainer: css({
    height: 300,
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: zIndex.card,
  }),
  hero: css({
    background: colors.gradient,
    height: 500,
    marginTop: -32,
    zIndex: -1,
  }),
  heroContainer: css({
    paddingTop: 100,
  }),
  signin: css({
    fontSize: 48,
    marginBottom: 6,
  }),
  textContainer: css({
    color: colors.white,
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
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <>
      <BoxContainer className={styles.hero} containerClassName={styles.heroContainer} bottom>
        <LayoutContainer className={styles.textContainer}>
          <h2 className={styles.signin}>Sign in</h2>
          <h3>or create an account</h3>
        </LayoutContainer>
      </BoxContainer>
      <div className={styles.authCenter}>
        <Card className={styles.authContainer} feature>
          <StyledFirebaseAuth firebaseAuth={firebaseApp.auth()} uiConfig={uiConfig} />
        </Card>
      </div>
    </>
  );
};

export default SigninPage;
