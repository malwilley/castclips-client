import * as React from 'react'
import { css } from 'emotion'
import { colors, fonts, clickable, breakpoints } from 'styles'
import LayoutContainer from './LayoutContainer'
import Logo from 'icons/Logo'
import ListennotesPng from 'icons/Listennotes.png'
import ListennotesWebp from 'icons/Listennotes.webp'
import Appbase from 'icons/Appbase'
import AccessibleLabel from './AccessibleLabel'

const styles = {
  main: css(
    breakpoints.breakpoint400({
      height: '14rem',
    }),
    breakpoints.breakpoint800({
      height: '12rem',
    }),
    {
      backgroundColor: colors.gunmetal800,
      margin: 0,
      height: '18rem',
      overflow: 'hidden',
      paddingTop: 30,
    }
  ),
  content: css(
    breakpoints.breakpoint600({
      padding: '2rem',
    }),
    breakpoints.breakpoint800({
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }),
    {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: colors.gunmetal100,
      height: '100%',
      padding: '2rem 1rem',
    }
  ),
  text: css(fonts.text200, {
    margin: '0.5rem 0 0 0',
  }),
  link: css(clickable, {
    color: colors.white,
    display: 'inline-block',
    textDecoration: 'underline',
    fontWeight: 'bold',
  }),
  listennotes: css(clickable, {
    '& img': {
      height: 18,
    },
    margin: '0.5rem 2rem 0.5rem 0',
    display: 'block',
  }),
  appbase: css(clickable, {
    '& > svg': {
      height: 24,
      fill: colors.white,
    },
    margin: '0.5rem 0rem 0.5rem 0',
    display: 'block',
  }),
  attributionContainer: css({
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  }),
}

const Footer: React.FC = () => (
  <div className={styles.main}>
    <LayoutContainer className={styles.content}>
      <div>
        <Logo color={colors.white} height={23} width={100} />
        <p className={styles.text}>
          Create, share, and discover clips from your favorite podcasts.
          <br />
          Brought to you by podcast lover{' '}
          <a className={styles.link} href="https://malachi.dev/">
            malachi.dev
          </a>
        </p>
      </div>
      <div className={styles.attributionContainer}>
        <a
          className={styles.listennotes}
          href="https://listennotes.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <AccessibleLabel>Powered by Listen Notes</AccessibleLabel>
          <picture>
            <source type="image/webp" srcSet={ListennotesWebp} />
            <img alt="Listen Notes logo" src={ListennotesPng} />
          </picture>
        </a>
        <a
          className={styles.appbase}
          href="https://appbase.io/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <AccessibleLabel>Powered by Appbase</AccessibleLabel>
          <Appbase />
        </a>
      </div>
    </LayoutContainer>
  </div>
)

export default Footer
