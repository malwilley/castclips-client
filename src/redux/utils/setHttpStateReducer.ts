import { ActionWithPayload } from '../types';
import { HttpRequest } from '~/types';

const makeHttpReducer = <T extends string, P extends HttpRequest<any>>(
  actionCreator: (payload?: P) => ActionWithPayload<T, P>
) => (state: P = { type: 'not_asked' } as P, action: ActionWithPayload<T, P>) => {
  switch (action.type) {
    case actionCreator().type:
      return action.payload;
    default:
      return state;
  }
};

export default makeHttpReducer;
