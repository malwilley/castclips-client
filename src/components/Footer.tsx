import React, { lazy } from 'react'
import { css } from 'emotion'
import { colors, fonts, clickable, breakpoints } from 'styles'
import LayoutContainer from './LayoutContainer'
import LogoWaves from 'icons/LogoWaves'
import ListennotesPng from 'icons/Listennotes.png'
import ListennotesWebp from 'icons/Listennotes.webp'
import AccessibleLabel from './AccessibleLabel'

const styles = {
  main: css(breakpoints.breakpoint400({}), breakpoints.breakpoint800({}), {
    backgroundColor: colors.gunmetal800,
    margin: 0,
    overflow: 'hidden',
    paddingTop: 30,
  }),
  content: css(
    breakpoints.breakpoint600({
      padding: '2rem',
    }),
    breakpoints.breakpoint800({
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '2rem',
      textAlign: 'left',
    }),
    {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: colors.gunmetal100,
      height: '100%',
      padding: '2rem 1rem',
      textAlign: 'center',
    }
  ),
  text: css(fonts.text200, {
    lineHeight: 1.5,
    margin: '0.5rem 0 0 0',
    '& a': css(clickable, {
      color: colors.white,
      display: 'inline-block',
      textDecoration: 'underline',
      fontWeight: 'bold',
    }),
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
  attributionContainer: css(
    breakpoints.breakpoint800({
      margin: 0,
    }),
    {
      display: 'flex',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      marginTop: '2rem',
    }
  ),
}

const Appbase = lazy(() => import(/* webpackChunkName: "appbase-icon" */ 'icons/Appbase'))

const Footer: React.FC = () => (
  <div className={styles.main}>
    <LayoutContainer className={styles.content}>
      <div>
        <LogoWaves color={colors.white} height={60} width={60} />
        <p className={styles.text}>
          Create, share, and discover clips from your favorite podcasts.
          <br />
          This project is open source!{' '}
          <a
            href="https://github.com/malwilley/castclips-client"
            target="_blank"
            rel="noopener noreferrer"
          >
            See the code on GitHub.
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
