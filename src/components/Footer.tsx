import * as React from 'react';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import Logo from './Logo';
import LayoutContainer from './LayoutContainer';

const styles = {
  main: css({
    backgroundColor: colors.gunmetal800,
  }),
  content: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 120,
    color: colors.gunmetal100,
  }),
  logo: css({
    color: colors.lightest,
    fontSize: '1.5rem',
  }),
  text: css(fonts.text200, {
    margin: '0.2rem 0 0 0',
  }),
  link: css({
    color: colors.lightest,
    textDecoration: 'underline',
    fontWeight: 'bold',
  }),
};

const Footer: React.FC = () => (
  <div className={styles.main}>
    <LayoutContainer className={styles.content}>
      <div>
        <Logo className={styles.logo} />
        <p className={styles.text}>
          Create, edit, and share clips from your favorite podcasts
          <br />
          Brought to you by podcast lover{' '}
          <a className={styles.link} href="https://malachi.dev/">
            malachi.dev
          </a>
        </p>
      </div>
      <div />
    </LayoutContainer>
  </div>
);

export default Footer;
