import * as React from 'react';
import { css } from 'emotion';
import { colors, fonts } from 'src/styles';
import LayoutContainer from './LayoutContainer';
import BoxContainer from './BoxContainer';
import Logo from 'src/icons/Logo';

const styles = {
  main: css({
    backgroundColor: colors.gunmetal800,
    margin: 0,
    height: 160,
  }),
  content: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: colors.gunmetal100,
    height: '100%',
  }),
  text: css(fonts.text200, {
    margin: '0.2rem 0 0 0',
  }),
  link: css({
    color: colors.white,
    textDecoration: 'underline',
    fontWeight: 'bold',
  }),
};

const Footer: React.FC = () => (
  <div>
    <BoxContainer className={styles.main} top>
      <LayoutContainer className={styles.content}>
        <div>
          <Logo color={colors.white} height={23} width={100} />
          <p className={styles.text}>
            Create, edit, and share clips from your favorite podcasts
            <br />
            Brought to you by podcast lover{' '}
            <a className={styles.link} href="https://malachi.dev/">
              malachi.dev
            </a>
          </p>
        </div>
      </LayoutContainer>
    </BoxContainer>
  </div>
);

export default Footer;
