import { ActionTypes } from '../redux/actions';
import { Reducer } from 'redux';
import { ModalState } from '../types';

const modal: Reducer<ModalState> = (state = { type: 'not_asked' }, action) => {
  switch (action.type) {
    case ActionTypes.ModalReset:
      return { type: 'not_asked' };
    case ActionTypes.ModalSend:
      return { type: 'sending' };
    case ActionTypes.ModalSuccess:
      return { type: 'success' };
    case ActionTypes.ModalError:
      return { type: 'error', message: action.payload };
    default:
      return state;
  }
};

export default modal;
