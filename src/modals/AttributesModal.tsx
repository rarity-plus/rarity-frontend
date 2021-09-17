import { createElement, useEffect, useState } from 'react';
import { useRarityAttributeContract } from '../hooks/useContract';
import { gameState } from '../contexts/Game';
import { RarityAttributes } from '../utils/rarityHelper';
import styled from 'styled-components';

const StyledAttributeElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledAttributeTitle = styled.span`

`

const StyledAttributeLevel = styled.span`

`

const AttributeElement: React.FC<{attributeIndex, attributeValue}> = ({attributeIndex, attributeValue}) => {
  return (
    <StyledAttributeElement className={'panel black'}>
      <StyledAttributeTitle>{RarityAttributes[attributeIndex].attributeTitle}</StyledAttributeTitle>
      <StyledAttributeLevel>{attributeValue}</StyledAttributeLevel>
    </StyledAttributeElement>
  )
}

const AttributesModal = createElement(() => {

  const [rawAttributeValues, setRawAttributeValues] = useState([8,8,8,8,8,8])

  const rarityAttributeContract = useRarityAttributeContract()

  useEffect(() => {
    (async () => {
        const characterCreated = await rarityAttributeContract.character_created(gameState.currentTokenId)

        if(characterCreated){
          const rawSummonAbillities = await rarityAttributeContract.ability_scores(gameState.currentTokenId)

          let rawSummonAbillitiesArr = (rawSummonAbillities as []).slice(0,6)

          setRawAttributeValues(rawSummonAbillitiesArr)
        }else{

        }
    })()
  }, [])

  return (
    <h1>
      {
        rawAttributeValues.map((value, index, array) => (
            <AttributeElement key={index} attributeIndex={index} attributeValue={value} />
          )
        )
      }
    </h1>
  )
})

export default AttributesModal