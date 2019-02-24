type UserLoggedIn = {
  type: 'loggedin';
  username: string;
};

type UserLoggedOut = {
  type: 'loggedout';
};

type AnonymousUser = {
  type: 'anonymous';
};

type UserState = UserLoggedIn | UserLoggedOut | AnonymousUser;

export type AuthState = {
  user: UserState;
};
