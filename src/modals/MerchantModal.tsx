import { createElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRarityContract } from '../hooks/useContract';
import { gameState } from '../contexts/Game';
import { infoToast } from '../contexts/Notifications';

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

const MerchantModal = createElement(() => {

  return (
    <StyledAdventureModal>

    </StyledAdventureModal>
  )
})

export default MerchantModal