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
  z-index: 10;
  
  overflow: auto;

  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  -o-user-select: none;
  user-select: none;
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
  
  padding: 0.1rem 0.5rem;
`

const StyledModalBody = styled.div`
  padding: 0.5rem 0.5rem;
`

const StyledGrow = styled.div`
  flex-grow: 1;
  width: 500px;
`

//TODO:Fix image rendering problems when modal showing animation is playing
//TODO:Add transitions for the background too
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

  const closeModal = () => {
    setModalActive(false)

    setTimeout(()=>{
      modal.hide()

      console.log("Hide modal")
    }, 500)
  }

  if(modal.data) {
    return (
      <StyledModalWrapper>

        <StyledModal expanded={modalActive} className={'panel'}>
          <StyledModalTitle className={'panel title'}>
            <h1>{modal.data.modalTitle}</h1>
            <StyledGrow/>
            {modal.data.important ? `` : <button onClick={closeModal} className={'btn danger'}>X</button>}
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