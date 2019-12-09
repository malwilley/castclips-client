import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import HeaderAccount from './HeaderAccount';
import Logo from 'icons/Logo';
import zIndex from 'styles/zIndex';
import SearchBar from 'modules/search/components/SearchBar';
import { clickable, colors } from 'styles';

type HeaderProps = {
  className?: string;
  searchText?: string;
};

const styles = {
  main: css({
    backgroundColor: colors.white,
    zIndex: zIndex.header,
  }),
  contentContainer: css({
    '@media (min-width: 1800px)': {
      maxWidth: 1400,
    },
    '@media (min-width: 800px)': {
      height: 90,
      paddingTop: 0,
    },
    height: 140,
    position: 'relative',
    maxWidth: 1200,
    margin: '0 auto',
    paddingTop: 20,
  }),
  logo: css(clickable, {
    gridArea: 'logo',
  }),
  logoAccountContainer: css({
    '@media (max-width: 800px)': {
      height: 40,
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px',
    height: '100%',
  }),
  search: css({
    '@media (min-width: 800px)': {
      width: 400,
      bottom: 24,
      left: '50%',
      padding: 0,
      transform: 'translateX(-50%)',
      right: 'auto',
    },
    left: 0,
    right: 0,
    transform: 'none',
    position: 'absolute',
    bottom: 20,
    padding: '0 20px',
    width: '100%',
  }),
};

const Header: React.FC<HeaderProps> = ({ className, searchText }) => (
  <header className={css(styles.main, className)}>
    <div className={styles.contentContainer}>
      <div className={styles.logoAccountContainer}>
        <Link className={styles.logo} to="/">
          <Logo height={30} width={130} />
        </Link>
        <HeaderAccount />
      </div>
      <div className={styles.search}>
        <SearchBar initialText={searchText} />
      </div>
    </div>
  </header>
);

export default Header;
