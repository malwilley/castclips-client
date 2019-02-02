import reducer from './reducer';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export type AppState = ReturnType<typeof reducer>;

export type Action<T extends string> = {
  type: T;
};
export type ActionWithPayload<T extends string, P> = Action<T> & {
  payload: P;
};

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType };

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export type Thunk<P, R = void> = (payload: P) => ThunkAction<R, AppState, undefined, AnyAction>;
