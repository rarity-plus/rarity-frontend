import useModal from '../../hooks/useModal';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledModalWrapper = styled.div`
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: start;

  background-color: rgba(0, 0, 0, 0.85);
`

const StyledModal = styled.div`
  margin-top: 10rem;
`

const StyledModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  font-weight: bold;
  text-shadow: black 1px 1px 5px;
`

const StyledModalBody = styled.div`
  padding: 0.5rem 0.5rem;
`

const StyledGrow = styled.div`
  flex-grow: 1;
  width: 500px;
`

const ModalListener = () => {
  const {modal, clear} = useModal()

  const [modalActive, setModalActive] = useState(false)

  useEffect(() => {
      setModalActive(modal != null)
  }, [modal])

  const closeModal = () => {
      if(modal){
        clear()
      }
  }

  if(modalActive) {
    return (
      <StyledModalWrapper>
        <StyledModal className={'panel'}>
          <StyledModalTitle className={'panel title'}>
            <h1>{modal?.modalTitle}</h1>
            <StyledGrow/>
            {modal?.important ? `` : <button onClick={closeModal} className={'btn small'}>X</button>}
          </StyledModalTitle>
          <StyledModalBody>
            {modal?.modalBody}
          </StyledModalBody>
        </StyledModal>
      </StyledModalWrapper>
    )
  }else {
    return (
      <></>
    )
  }

}

export default  ModalListener