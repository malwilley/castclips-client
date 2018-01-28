import * as React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { colors } from 'src/styles';
import HeaderAccount from './HeaderAccount';
import Typeahead from 'src/modules/search/components/Typeahead';
import HeaderTypeahead from './HeaderTypeahead';

type HeaderProps = {
  className?: string;
  showSearch?: boolean;
};

const styles = {
  main: css({
    '@media (max-width: 800px)': {
      height: 120,
      alignItems: 'flex-start',
      paddingTop: 20,
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: colors.lightest,
    backgroundColor: colors.gunmetal800,
    padding: '0 30px',
    height: 70,
    position: 'relative',
  }),
  logo: css({
    gridArea: 'logo',
  }),
  search: css({
    '@media (max-width: 800px)': {
      transform: 'none',
      left: 0,
      right: 0,
      width: '100%',
      padding: '0 20px',
    },
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 15,
    width: 400,
  }),
};

const Header: React.FC<HeaderProps> = ({ className, showSearch = true }) => (
  <header className={css(styles.main, className)}>
    <Link className={styles.logo} to="/">
      <h2>castclips</h2>
    </Link>
    <HeaderAccount />
    {showSearch && (
      <div className={styles.search}>
        <HeaderTypeahead />
      </div>
    )}
  </header>
);

export default Header;
