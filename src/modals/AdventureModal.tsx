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

const AdventureModal = createElement(() => {
  const rarityContract = useRarityContract()

  /*
  *  0 - Can't go to adventure
  *  1 - Can adventure
  *  2 - Adventuring
  *  3 - Finished Adventure
  * */
  const [adventureState, setAdventureState] = useState(0)

  useEffect( () => {
    (async () => {
          const adventureLog = await rarityContract.adventurers_log(gameState.currentTokenId)

          if(adventureLog){
            let adventureLogTimestamp = Number(adventureLog.toString())

            let currentTimestamp = Date.now() / 1000

            if(currentTimestamp > adventureLogTimestamp){
              setAdventureState(1)
            }
          }
    })()
  }, [])

  const startAdventureHandle = async () => {
    try{
      const adventureTX = await rarityContract.adventure(gameState.currentTokenId)
      setAdventureState(2)
      await adventureTX.wait()
      setAdventureState(3)
    }catch(e){
      setAdventureState(-1)
    }
  }

  const getCurrentState = () => {
    switch (adventureState){
      case 0: {
          return (
            <StyledModalTitle>Looks like the dungeon is closed :(</StyledModalTitle>
          )
      }
      case 1: {
          return (
            <>
              <StyledModalTitle>Embark in a adventure that you never seen</StyledModalTitle>
              <p>Be careful, this adventure isn't for the weak of heart</p>
              <button className={'btn'} onClick={startAdventureHandle}>Go to the Dungeon</button>
            </>
          )
      }
      case 2: {
          return (
            <StyledModalTitle>Exploring and fighting monsters</StyledModalTitle>
          )
      }
      case 3: {
        return (
          <StyledModalTitle>You finished the dungeon and received +200 XP</StyledModalTitle>
        )
      }
      default: {
        return (
          <StyledModalTitle>OOPS, looks like something isn't right</StyledModalTitle>
        )
      }
    }
  }

  return (
    <StyledAdventureModal>
      {getCurrentState()}
    </StyledAdventureModal>
  )
})

export default AdventureModal