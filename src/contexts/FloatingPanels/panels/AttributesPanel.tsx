import { createElement, useEffect, useState } from 'react';
import { useRarityAttributeContract, useRarityContract } from '../../../hooks/useContract';
import { gameState } from '../../Game';
import { RarityAttributes } from '../../../utils/rarityHelper';
import styled from 'styled-components';
import { infoToast } from '../../Notifications';
import { BigNumber } from 'ethers';

const StyledAttributeElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: small;
`

const StyledAttributeTitle = styled.span`

`

const StyledAttributeLevel = styled.span`
  display: flex;
  align-items: center;
  
  button {
    opacity: 0.9;
    margin-right: 0.2rem;
    padding: 0.2rem 0.2rem;
    height: 20px;
    
    &:disabled {
      opacity: 0.3;
    }
  }
`

const StyledPointsToSpend = styled.div`
  margin-bottom: 0.5rem;
`

type AttributeElementType = {
  pointsToAssign: number,
  attributesArr: number[],

  attributeIndex: number,
  attributeValue: number,

  increaseHandle: (index: number) => void,
  decreaseHandle: (index: number) => void,

  characterCreated: boolean
}

const AttributeElement: React.FC<AttributeElementType> = ({characterCreated,attributesArr,pointsToAssign, attributeIndex, attributeValue, increaseHandle, decreaseHandle}) => {

  const [canIncrease, setCanIncrease] = useState(true)
  const [canDecrease, setCanDecrease] = useState(true)

  useEffect(() => {

    // if(pointsToAssign - 1 <= 0) {
    //   setCanIncrease(false)
    // }else{
    //   setCanIncrease(true)
    // }
    let arr = [...attributesArr]
    arr[attributeIndex] += 1;

    const totalComputeCost = Object.keys(arr).reduce(
      (acc, item) => {
        const computeLevelingScore = (value) => {
          const base = value - 8;
          if (value <= 14) {
            return base;
          } else {
            return Math.floor(base ** 2 / 6);
          }
        };
        return acc + computeLevelingScore(arr[item]);
      },
      0
    );
    //TODO: Make it one expression
    if(32 - totalComputeCost < 0){
      setCanIncrease(false)
    }else{
      setCanIncrease(true)
    }

    console.log(characterCreated)

    //TODO: Make it one expression
    if(!(attributeValue > 8)){

      setCanDecrease(false)
    }else{
      setCanDecrease(true)
    }
  }, [attributesArr])

  return (
    <StyledAttributeElement className={'panel'}>
      <StyledAttributeTitle>{RarityAttributes[attributeIndex].attributeTitle}</StyledAttributeTitle>
      <StyledAttributeLevel>
        {
          !characterCreated && (() => {
            return (
              <>
                <button disabled={!canDecrease} onClick={() => decreaseHandle(attributeIndex)} className={'btn'}>-</button>
                <button disabled={!canIncrease} onClick={() => increaseHandle(attributeIndex)} className={'btn'}>+</button>
              </>
            )
          })()
        }

        {attributeValue}
      </StyledAttributeLevel>
    </StyledAttributeElement>
  )
}

const AttributesPanel = () => {

  const [rawAttributeValues, setRawAttributeValues] = useState([8,8,8,8,8,8])
  const [pointsToAssign, setPointsToAssign] = useState(32)
  const [characterCreated, setCharacterCreted] = useState(false)

  const rarityAttributeContract = useRarityAttributeContract()
  const rarityContract = useRarityContract()

  function abilitiesByLevel(level) {
    return BigNumber.from(level).div(4)
  }

  useEffect(() => {
    (async () => {
      //TODO: Take in account that when you had created your character you can increase stats just one by one
      const characterCreated = await rarityAttributeContract.character_created(gameState.currentTokenId)

      setCharacterCreted(characterCreated)

      if(characterCreated){
        const rawSummonAbillities = await rarityAttributeContract.ability_scores(gameState.currentTokenId)

        let rawSummonAbillitiesArr = (rawSummonAbillities as []).slice(0,6)

        setRawAttributeValues(rawSummonAbillitiesArr)

        const level = await rarityContract.level(gameState.currentTokenId)

        const pointsSpent = await rarityAttributeContract.level_points_spent(gameState.currentTokenId)

        //TODO: Make it smarter
        if(abilitiesByLevel(level).sub(pointsSpent) > BigNumber.from(0)){
          setPointsToAssign(abilitiesByLevel(level).sub(pointsSpent).toNumber())
        }else {
          setPointsToAssign(0)
        }
      }
    })()
  }, [])

  useEffect(() => {
    const totalComputeCost = Object.keys(rawAttributeValues).reduce(
      (acc, item) => {
        const computeLevelingScore = (value) => {
          const base = value - 8;
          if (value <= 14) {
            return base;
          } else {
            return Math.floor(base ** 2 / 6);
          }
        };
        return acc + computeLevelingScore(rawAttributeValues[item]);
      },
      0
    );

    setPointsToAssign(
      Math.ceil(32 - totalComputeCost)
    );
  }, [rawAttributeValues])


  const increaseHandle = (index) => {

    if(!(pointsToAssign <= 0)){
      let array = [...rawAttributeValues]
      array[index] += 1

      setRawAttributeValues(array)
    }
    // let array = [...rawAttributeValues]

  }

  const decreaseHandle = (index) => {
    if(pointsToAssign > 0 && rawAttributeValues[index] > 8){
      let array = [...rawAttributeValues]
      array[index] -= 1

      setRawAttributeValues(array)
    }
  }

  const assignPointsHandle = async () => {
    try {
      const assignPointsTX = await rarityAttributeContract.point_buy(
        gameState.currentTokenId,
        rawAttributeValues[0],
        rawAttributeValues[1],
        rawAttributeValues[2],
        rawAttributeValues[3],
        rawAttributeValues[4],
        rawAttributeValues[5]
      )
      infoToast("Assigning points...")
      await assignPointsTX.wait()
      infoToast("Points assigned...")
    }catch (e){
      infoToast("An error happened when assigning points...")
      console.error(e)
    }
  }

  return (
    <div>
      <StyledPointsToSpend className={'panel flex justify-between no-transparent'}>
        <span>Points to spend:</span>
        <span>{pointsToAssign}</span>
      </StyledPointsToSpend>

      {
        rawAttributeValues.map((value, index, array) => (
            <AttributeElement
              key={index}
              attributesArr={rawAttributeValues}
              pointsToAssign={pointsToAssign}
              attributeIndex={index}
              attributeValue={value}
              increaseHandle={increaseHandle}
              decreaseHandle={decreaseHandle}
              characterCreated={characterCreated}
            />
          )
        )
      }
      {
        !characterCreated && (() => {
          return (<button onClick={assignPointsHandle} className={'btn'}>Assign Points</button>)
        })()
      }
    </div>
  )
}

export default AttributesPanel