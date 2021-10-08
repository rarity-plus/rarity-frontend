import { createElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRarityContract } from '../hooks/useContract';
import { gameState } from '../contexts/Game';
import { infoToast } from '../contexts/Notifications';

const StyledAdventureModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  
  & > * {
    margin-top: 1rem;
  }
`

const StyledRow = styled.div`
  display: flex;
  justify-content: stretch;
  font-size: 0.8rem;
`

const StyledDetails = styled.div`
  padding: 5px 10px;
  border-radius: 1px 2px;
`

const StyledNPCImage = styled.img`
  width: 250px;
`

const MerchantModal = createElement(() => {

  return (
    <StyledAdventureModal>
      <StyledRow className={'panel book'}>
        <StyledNPCImage src={"/assets/merchant_image.png"} />
        <StyledDetails>
          Sorry but my shop is closed at this moment!
        </StyledDetails>
      </StyledRow>
    </StyledAdventureModal>
  )
})

export default MerchantModal