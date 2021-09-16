import { createElement } from 'react';
import styled from 'styled-components';

const StyledAdventureModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > * {
    margin-top: 1rem;
  }
`

const StyledModalTitle = styled.h1`
  font-weight: bold;
  font-size: larger;
`

export const adventureModal = createElement(() => {
  return (
    <StyledAdventureModal>
      <StyledModalTitle>Embark in a adventure that you never seen</StyledModalTitle>
      <p>Be careful, this adventure isn't for the weak of heart</p>
      <button className={'btn'}>Start Adventure</button>
    </StyledAdventureModal>
  )
})