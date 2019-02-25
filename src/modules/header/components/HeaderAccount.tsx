import * as React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { AppState } from '~/redux/types';
import { connect } from 'react-redux';
import { AuthState, UserLoggedIn } from '~/modules/auth/types';
import Button from '~/components/Button';
import firebase from '~/modules/auth/firebase';

type HeaderAccountProps = {
  className?: string;
  user: AuthState['user'];
};

const styles = {
  main: css({}),
};

const HeaderAccountLoggedIn: React.FC<{ user: UserLoggedIn }> = ({ user }) => (
  <div>
    <Button onClick={() => firebase.auth().signOut()}>Log out</Button>
  </div>
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
