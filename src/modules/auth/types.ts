export type UserLoggedIn = {
  type: 'loggedin';
  user: firebase.User;
};

export type UserLoggedOut = {
  type: 'loggedout';
};

export type AnonymousUser = {
  type: 'anonymous';
  user: firebase.User;
};

type UserState = UserLoggedIn | UserLoggedOut | AnonymousUser;

export type AuthState = {
  user: UserState;
};
