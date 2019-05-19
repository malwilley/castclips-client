import * as React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { AppState } from '~/redux/types';
import { connect } from 'react-redux';
import { AuthState, UserLoggedIn } from '~/modules/auth/types';
import Button from '~/components/Button';
import firebase from '~/modules/auth/firebase';
import Downshift from 'downshift';
import { colors } from '~/styles';
import { MenuDownIcon } from 'mdi-react';

type HeaderAccountProps = {
  className?: string;
  user: AuthState['user'];
};

const styles = {
  email: css({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  }),
  main: css({
    position: 'relative',
  }),
  menuDown: css({
    marginLeft: 6,
  }),
  dropdown: css({
    backgroundColor: colors.lightest,
    borderRadius: 8,
    padding: '10px 0',
    position: 'absolute',
    top: 40,
    right: 0,
    width: 200,
    boxShadow: 'var(--card-dropshadow-feature)',
  }),
  dropdownItem: css({
    '&:hover': {
      backgroundColor: colors.gray20,
    },
    '& > button': {
      fontWeight: 'normal',
      color: colors.gray700,
    },
    padding: '10px 20px',
    cursor: 'pointer',
  }),
};

const HeaderAccountLoggedIn: React.FC<{ user: UserLoggedIn }> = ({ user }) => (
  <Downshift>
    {({ isOpen, toggleMenu }) => (
      <div className={styles.main}>
        <div className={styles.email} onClick={() => toggleMenu()}>
          {user.user.email}
          <MenuDownIcon className={styles.menuDown} />
        </div>
        {isOpen && (
          <ul className={styles.dropdown}>
            <li className={styles.dropdownItem}>
              <Button onClick={() => firebase.auth().signOut()}>Log out</Button>
            </li>
          </ul>
        )}
      </div>
    )}
  </Downshift>
);

const HeaderAccountLoggedOut: React.FC = () => (
  <>
    <Link to={'/signin'}>Sign in</Link>
  </>
);

const HeaderAccount: React.FC<HeaderAccountProps> = ({ className, user }) => (
  <div className={css(styles.main, className)}>
    {user.type === 'loggedin' ? <HeaderAccountLoggedIn user={user} /> : <HeaderAccountLoggedOut />}
  </div>
);

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(HeaderAccount);
