import { ActionWithPayload } from '../types';

const makeSimpleSetReducer = <T extends string, P>(
  actionCreator: (payload?: P) => ActionWithPayload<T, P>,
  defaultValue: P
) => (state: P = defaultValue, action: ActionWithPayload<T, P>) => {
  switch (action.type) {
    case actionCreator().type:
      return action.payload;
    default:
      return state;
  }
};

export default makeSimpleSetReducer;
