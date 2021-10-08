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
    margin-top: 0.2rem;
  }
`

const StyledModalTitle = styled.h1`
  font-weight: bold;
  font-size: larger;
  text-align: center;
  
  margin-bottom: 1rem;
  
  color: #625510;
`

const StyledBook = styled.div`
  padding: 5px 5px;
  
  p {
    text-align: center;
  }
  
  button {
    color: #5a3c18;
    margin-top: 2rem;
  }
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
            <StyledBook className={'panel book'}>
              <p>You already read this tale, come back tomorrow.</p>
            </StyledBook>
          )
      }
      case 1: {
          return (
            <StyledBook className={'panel book'}>
              <StyledModalTitle>A lost tale</StyledModalTitle>
              <p>Reading lost tales helps your character gather experience without going in an adventure.</p>
              <button className={'btn'} onClick={startAdventureHandle}>Read</button>
            </StyledBook>
          )
      }
      case 2: {
          return (
            <StyledModalTitle>Reading lost tales...</StyledModalTitle>
          )
      }
      case 3: {
        return (
          <StyledModalTitle>You finished reading, now you have more experience than before!</StyledModalTitle>
        )
      }
      default: {
        return (
          <StyledModalTitle>Looks like a page is missing or did you forgot your glasses ?</StyledModalTitle>
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