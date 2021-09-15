import { ReactNode } from 'react';


export interface Modal {
  modalTitle: string,
  modalBody: ReactNode | null,
  important: boolean
}

export interface ModalContextApi {
  modal: Modal | null
  clear: () => void,
  show: (modal: Modal) => void
}