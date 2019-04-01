import * as React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { colors } from '~/styles';
import HeaderAccount from './HeaderAccount';
import Typeahead from '~/modules/search/components/Typeahead';
import HeaderTypeahead from './HeaderTypeahead';

type HeaderProps = {
  className?: string;
};

const styles = {
  main: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: colors.lightest,
    backgroundColor: colors.possibleHeaderColor,
    padding: '0 30px',
    height: 70,
    position: 'relative',
  }),
  logo: css({
    gridArea: 'logo',
  }),
  search: css({
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 15,
  }),
};

const Header: React.FC<HeaderProps> = ({ className }) => (
  <header className={css(styles.main, className)}>
    <Link className={styles.logo} to="/">
      <h2>castclips</h2>
    </Link>
    <HeaderAccount />
    <div className={styles.search}>
      <HeaderTypeahead />
    </div>
  </header>
);

export default Header;
