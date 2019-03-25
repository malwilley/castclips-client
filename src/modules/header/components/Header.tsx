import * as React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { colors } from '~/styles';
import HeaderAccount from './HeaderAccount';
import Typeahead from '~/modules/search/components/Typeahead';

type HeaderProps = {
  className?: string;
};

const styles = {
  main: css({
    display: 'grid',
    gridTemplateColumns: '[logo] auto [middle] 1fr [user] auto',
    alignItems: 'center',
    color: colors.lightest,
    backgroundColor: colors.possibleHeaderColor,
    padding: '20px 30px',
  }),
  logo: css({
    gridArea: 'logo',
  }),
  header: css({
    gridArea: 'user',
  }),
  search: css({
    display: 'flex',
    justifyContent: 'center',
    gridArea: 'middle',
  }),
};

const Header: React.FC<HeaderProps> = ({ className }) => (
  <header className={css(styles.main, className)}>
    <Link className={styles.logo} to="/">
      <h2>castclips</h2>
    </Link>
    <div className={styles.search}>
      <Typeahead />
    </div>
    <HeaderAccount className={styles.header} />
  </header>
);

export default Header;
