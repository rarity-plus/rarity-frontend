import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { modal } from './Context';
import { autorun } from 'mobx';


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

const StyledModal = styled.div<{expanded}>`
  margin-top: 10rem;
  
  transform: scale(0);
  transition: transform .5s ease-in-out;

  ${ (props) => props.expanded && css `
    transform: scale(1);
  `}
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

//TODO:Fix image rendering problems when modal showing animation is playing
const ModalListener = observer(() => {

  const [modalActive, setModalActive] = useState(false)

  useEffect(() => {
    setTimeout(()=>{
      if(modal.data){
        setModalActive(true)
      }else{
        setModalActive(false)
      }
    }, 10)

  }, [modal.data])

  if(modal.data) {
    return (
      <StyledModalWrapper>

        <StyledModal expanded={modalActive} className={'panel'}>
          <StyledModalTitle className={'panel title'}>
            <h1>{modal.data.modalTitle}</h1>
            <StyledGrow/>
            {modal.data.important ? `` : <button onClick={modal.hide} className={'btn small'}>X</button>}
          </StyledModalTitle>
          <StyledModalBody>
            {modal.data.modalBody}
          </StyledModalBody>
        </StyledModal>

      </StyledModalWrapper>
    )
  }else {
    return (
      <></>
    )
  }

})

export default  ModalListener