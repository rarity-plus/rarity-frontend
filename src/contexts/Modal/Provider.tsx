import { Modal, ModalContextApi } from './types';
import { createContext, useCallback, useContext, useState } from 'react';


export const ModalContext = createContext({} as ModalContextApi)

//TODO: Probably a modal queue is needed

const ModalProvider: React.FC = ({children}) => {
  const [currentModal, setCurrentModal] = useState<Modal | null>()

  const showModal = useCallback((modal: Modal) => {
      setCurrentModal(modal)
  }, [])

  const clearModal = useCallback(() => {
      setCurrentModal(null)
  }, [])

  return (
    <ModalContext.Provider value={{
        modal: currentModal,
        show: showModal,
        clear: clearModal
      }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider