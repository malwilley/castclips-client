import * as React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { AppState } from 'src/redux/types';
import { connect } from 'react-redux';
import { AuthState, UserLoggedIn } from 'src/modules/auth/types';
import Button from 'src/components/Button';
import firebase from 'src/modules/auth/firebase';
import Downshift from 'downshift';
import { colors, fonts, boxShadow } from 'src/styles';
import { MenuDownIcon, UserIcon } from 'mdi-react';
import zIndex from 'src/styles/zIndex';

type HeaderAccountProps = {
  className?: string;
  user: AuthState['user'];
};

const styles = {
  email: css({
    display: 'flex',
    alignItems: 'center',
  }),
  loggedInMain: css({
    position: 'relative',
  }),
  loggedInToggle: (isOpen: boolean) =>
    css({
      '&:hover svg': {
        color: colors.gray800,
      },
      '& svg': {
        color: isOpen ? colors.gray800 : colors.gray100,
      },
      background: colors.background,
      outline: 'none',
      padding: '8px 12px',
      borderRadius: 8,
      cursor: 'pointer',
    }),
  menuDown: css({
    marginLeft: 6,
    transition: '250ms color ease-out',
  }),
  dropdown: css({
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: '10px 0',
    position: 'absolute',
    top: 54,
    right: 0,
    width: 200,
    boxShadow: boxShadow.card,
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
  signin: css(fonts.heading300, {
    padding: '10px 20px',
    backgroundColor: colors.secondary20,
    color: colors.secondary500,
    borderRadius: 8,
  }),
  userPic: css({
    height: 34,
    width: 34,
    borderRadius: '50%',
  }),
  userPicPlaceholder: css(fonts.heading200, {
    height: 34,
    width: 34,
    borderRadius: '50%',
    backgroundColor: colors.primary500,
    color: colors.white,
    lineHeight: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
};

const HeaderAccountLoggedIn: React.FC<{ user: UserLoggedIn }> = ({ user }) => (
  <Downshift>
    {({ isOpen, toggleMenu, getMenuProps, getToggleButtonProps }) => (
      <div className={styles.loggedInMain}>
        <Button
          {...getToggleButtonProps()}
          className={styles.loggedInToggle(isOpen)}
          onClick={() => toggleMenu()}
        >
          <div className={styles.email}>
            {user.user.photoUrl ? (
              <img className={styles.userPic} src={user.user.photoUrl} />
            ) : (
              <div className={styles.userPicPlaceholder}>{user.user.email[0].toUpperCase()}</div>
            )}
            <MenuDownIcon className={styles.menuDown} size={24} />
          </div>
        </Button>
        {isOpen && (
          <ul className={styles.dropdown} {...getMenuProps()}>
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
    <Link className={styles.signin} to={'/signin'}>
      Sign in
    </Link>
  </>
);

const HeaderAccount: React.FC<HeaderAccountProps> = ({ className, user }) => (
  <div className={className}>
    {user.type === 'loggedin' ? <HeaderAccountLoggedIn user={user} /> : <HeaderAccountLoggedOut />}
  </div>
);

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(HeaderAccount);
