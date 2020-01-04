import { createAction } from 'redux/createAction';
import { ActionsUnion } from 'redux/types';

export enum ActionTypes {
  ModalSend = 'modal/send',
  ModalError = 'modal/error',
  ModalReset = 'modal/reset',
  ModalSuccess = 'modal/success',
}

export const actions = {
  modalSend: () => createAction(ActionTypes.ModalSend),
  modalError: (message: string) => createAction(ActionTypes.ModalError, message),
  modalReset: () => createAction(ActionTypes.ModalReset),
  modalSuccess: () => createAction(ActionTypes.ModalSuccess),
};

export type Actions = ActionsUnion<typeof actions>;
