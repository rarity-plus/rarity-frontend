import { createElement, useEffect } from 'react';
import styled from 'styled-components';
import { modal } from '../../../../contexts/Modal';
import { useRarityContract } from '../../../../hooks/useContract';
import { gameState } from '../../../../contexts/Game';
import useWeb3 from '../../../../hooks/useWeb3';
import { useWeb3React } from '@web3-react/core';

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

export const adventureStartedModal = createElement(() => {

    return (
      <StyledAdventureModal>
        <StyledModalTitle>You returned from your adventure</StyledModalTitle>
      </StyledAdventureModal>
    )
})

export const adventureModal = createElement(() => {
  const rarityContract = useRarityContract()

  const handleClick = async () => {
    try{
      const adventureTX = await rarityContract.adventure(gameState.currentTokenId)

      await adventureTX.wait()
    }catch(e){
      console.error(e)
    }

      modal.show("Adventure Finished", adventureStartedModal, false)
  }

  return (
    <StyledAdventureModal>
      <StyledModalTitle>Embark in a adventure that you never seen</StyledModalTitle>
      <p>Be careful, this adventure isn't for the weak of heart</p>
      <button className={'btn'} onClick={handleClick}>Go to the Dungeon</button>
    </StyledAdventureModal>
  )
})