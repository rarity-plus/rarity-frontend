import { createElement, useEffect } from 'react';
import { useRarityContract } from '../hooks/useContract';
import { RarityClasses, RarityClassesDescription } from '../utils/rarityHelper';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { infoToast } from '../contexts/Notifications';

const StyledSummonElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledSummonDetails = styled.div`
  display: flex;
  flex-direction: column;
  
`

const StyledSummonDescription = styled.p`
  opacity: .4;
  font-size: small;
  margin-top: 0.5rem;
`

const SummonElement: React.FC<{summonClass}> = ({summonClass}) => {
  const history = useHistory()
  const rarityContract = useRarityContract()

  const recruitSummonHandle = async () => {
    try {
        infoToast("Summoning...")

        const summonTX = await rarityContract.summon(summonClass)

        await summonTX.wait()

        infoToast("An summon appeared. Redirecting...")

        setTimeout(() => {
          history.go(0)
        }, 1000)
    }catch (e){
      infoToast("An error appeared when summoning...")
    }

    // history.go(0)
  }

  return (
    <StyledSummonElement className={'panel black'}>
        <StyledSummonDetails>
          <h1>{RarityClasses[summonClass]}</h1>
          <StyledSummonDescription>{RarityClassesDescription[summonClass]}</StyledSummonDescription>
        </StyledSummonDetails>

        <button onClick={recruitSummonHandle} className={'btn'}>Recruit</button>
    </StyledSummonElement>
  )
}

const RecruitSummonModal = createElement(() => {
    const rarityContract = useRarityContract()

    useEffect(() => {

    }, [])

    const summonList = Object.keys(RarityClasses).map((value, index, arr) => {
      return (
        <SummonElement key={index} summonClass={value} />
      )
    })

    return (
      <div>
        {summonList}
      </div>
    )
})

export default RecruitSummonModal