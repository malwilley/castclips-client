import { ActionWithPayload } from '../types';
import { HttpRequest } from 'types';
import { Reducer } from 'redux';

const makeHttpReducer = <P extends HttpRequest<any>, A extends string = any>(
  actionType: A
): Reducer<P, ActionWithPayload<A, P>> => (state = { type: 'not_asked' } as P, action) => {
  switch (action.type) {
    case actionType:
      return action.payload;
    default:
      return state;
  }
};

export default makeHttpReducer;
