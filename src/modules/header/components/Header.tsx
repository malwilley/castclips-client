import * as React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import HeaderAccount from './HeaderAccount';
import Logo from 'src/icons/Logo';
import zIndex from 'src/styles/zIndex';
import SearchBar from 'src/modules/search/components/SearchBar';
import { clickable } from 'src/styles';

type HeaderProps = {
  className?: string;
  searchText?: string;
};

const styles = {
  main: css({
    '@media (min-width: 1800px)': {
      maxWidth: 1400,
    },
    '@media (max-width: 800px)': {
      height: 140,
      paddingTop: 20,
    },
    height: 110,
    position: 'relative',
    maxWidth: 1200,
    margin: '0 auto',
    width: '100%',
    zIndex: zIndex.card,
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
    '@media (max-width: 800px)': {
      transform: 'none',
      left: 0,
      right: 0,
      width: '100%',
      padding: '0 20px',
      bottom: 20,
    },
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 34,
    width: 400,
  }),
};

const Header: React.FC<HeaderProps> = ({ className, searchText }) => (
  <header className={css(styles.main, className)}>
    <div className={styles.logoAccountContainer}>
      <Link className={styles.logo} to="/">
        <Logo height={30} width={130} />
      </Link>
      <HeaderAccount />
    </div>
    <div className={styles.search}>
      <SearchBar initialText={searchText} />
    </div>
  </header>
);

export default Header;
