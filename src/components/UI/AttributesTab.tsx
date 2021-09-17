import styled from 'styled-components';
import { useRarityAttributeContract } from '../../hooks/useContract';
import { useEffect, useState } from 'react';
import { gameState } from '../../contexts/Game';
import { RarityAttributes } from '../../utils/rarityHelper';

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
//TODO: Make this reusable
const AttributesTab = () => {
    const rarityAttributeContract = useRarityAttributeContract()

    const [rawAttributesValues , setRawAttributesValues] = useState([])

    useEffect(() => {
        (async () => {
          const characterCreated = await rarityAttributeContract.character_created(gameState.currentTokenId)

          if(characterCreated){
            const rawSummonAbillities = await rarityAttributeContract.ability_scores(gameState.currentTokenId)

            let rawSummonAbillitiesArr = (rawSummonAbillities as []).slice(0,6)

            setRawAttributesValues(rawSummonAbillitiesArr)

            console.log(rawSummonAbillitiesArr)
          }else{
            setRawAttributesValues([8,8,8,8,8,8])
          }
        })()
    }, [])

    // const AttributeElementList = () => {
    //     // Object.keys(rawAttributesValues).map((val, index, arr) => {
    //     //     return (
    //     //       <AttributeElement key={index} attributeIndex={index} attributeValues={rawAttributesValues} />
    //     //     )
    //     // })
    // }

    return (
      <>
          {
              rawAttributesValues.map((value, index, array) => (
                  <AttributeElement key={index} attributeIndex={index} attributeValue={value} />
                )
              )
          }
      </>
    )
}

export default AttributesTab