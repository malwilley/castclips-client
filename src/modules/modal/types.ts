type ModalSending = {
  type: 'sending'
}

type ModalNotAsked = {
  type: 'not_asked'
}

type ModalError = {
  type: 'error'
  message: string
}

type ModalSuccess = {
  type: 'success'
}

export type ModalState = ModalSending | ModalNotAsked | ModalError | ModalSuccess
