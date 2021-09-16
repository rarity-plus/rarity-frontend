// import { Modal, ModalContextApi } from './types';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { makeAutoObservable } from 'mobx';


// export const ModalContext = createContext({} as ModalContextApi)

//TODO: Probably a modal queue is needed

class Modal {

  data: {
    modalTitle: string,
    modalBody: ReactNode | null,
    important: boolean
  } | null = null

  constructor() {
      makeAutoObservable(this)
  }

  show = (modalTitle: string, modalBody: ReactNode | null, important:boolean) => {
    this.data = {
      modalTitle,
      modalBody,
      important
    }

    return this.data
  }

  hide = () => {
    this.data = null
  }

}

export const modal = new Modal()

// const ModalProvider: React.FC = ({children}) => {
//   const [currentModal, setCurrentModal] = useState<Modal | null>()
//
//   const showModal = useCallback((modal: Modal) => {
//       setCurrentModal(modal)
//   }, [])
//
//   const clearModal = useCallback(() => {
//       setCurrentModal(null)
//   }, [])
//
//   return (
//     <ModalContext.Provider value={{
//         modal: currentModal,
//         show: showModal,
//         clear: clearModal
//       }}>
//       {children}
//     </ModalContext.Provider>
//   )
// }
//
// export default ModalProvider