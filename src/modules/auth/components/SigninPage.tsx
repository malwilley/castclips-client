import React, { useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import firebaseApp from '../firebase'
import LayoutContainer from 'components/LayoutContainer'
import { css } from 'emotion'
import { colors } from 'styles'
import Card from 'components/Card'
import zIndex from 'styles/zIndex'
import RoundedCorners from 'components/RoundedCorners'
import Spinner from 'components/Spinner'
import { useLocation } from 'react-router'
import { parse } from 'querystringify'
import { useDispatch } from 'react-redux'
import { actions } from '../redux/actions'

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
    '@media (max-width: 800px)': {
      borderRadius: 8,
    },
    borderRadius: 16,
    background: colors.gradient,
    height: 500,
  }),
  signin: css({
    fontSize: 48,
    marginBottom: 6,
  }),
  textContainer: css({
    paddingTop: 100,
    color: colors.white,
    textAlign: 'center',
  }),
}

const SigninPage: React.FC = () => {
  const dispatch = useDispatch()
  const [isPendingRedirect, setIsPendingRedirect] = useState(false)
  const { search } = useLocation()
  const { destination = '/' } = parse(search) as { destination?: string }

  const uiConfig: firebaseui.auth.Config = {
    signInFlow: 'redirect',
    signInSuccessUrl: destination,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: authResult => {
        dispatch(actions.signInUser(authResult.user))

        return true
      },
    },
  }

  return (
    <>
      <div className={styles.hero}>
        <LayoutContainer className={styles.textContainer}>
          <h2 className={styles.signin}>Sign in</h2>
          <h3>or create an account</h3>
        </LayoutContainer>
      </div>
      <RoundedCorners top />
      <div className={styles.authCenter}>
        <Card className={styles.authContainer} feature>
          <StyledFirebaseAuth
            firebaseAuth={firebaseApp.auth()}
            uiConfig={uiConfig}
            uiCallback={ui => {
              setIsPendingRedirect(ui.isPendingRedirect())
            }}
          />
          {isPendingRedirect && <Spinner size={50} />}
        </Card>
      </div>
    </>
  )
}

export default SigninPage
