import { useDispatch } from 'react-redux';
import { AppState } from 'redux/types';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

const useThunkDispatch: () => (
  action: ThunkAction<any, AppState, undefined, AnyAction>
) => void = () => useDispatch();

export default useThunkDispatch;
