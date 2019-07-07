import * as React from 'react';
import { css } from 'emotion';
import { colors, fonts, clickable } from 'src/styles';
import LayoutContainer from './LayoutContainer';
import BoxContainer from './BoxContainer';
import Logo from 'src/icons/Logo';
import ListennotesPng from 'src/icons/Listennotes.png';
import ListennotesWebp from 'src/icons/Listennotes.webp';

const styles = {
  main: css({
    '@media (max-width: 700px)': {
      height: 230,
    },
    backgroundColor: colors.gunmetal800,
    margin: 0,
    height: 180,
  }),
  content: css({
    '@media (max-width: 700px)': {
      '& > :not(:last-child)': {
        marginBottom: 40,
      },
      alignItems: 'flex-start',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    color: colors.gunmetal100,
    height: '100%',
    padding: 40,
  }),
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
    display: 'block',
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
        <div>
          <a className={styles.listennotes} href="https://listennotes.com">
            <picture>
              <source type="image/webp" srcSet={ListennotesWebp} />
              <img alt="Listen Notes logo" src={ListennotesPng} />
            </picture>
          </a>
        </div>
      </LayoutContainer>
    </BoxContainer>
  </div>
);

export default Footer;
