import React, { useEffect } from 'react';
import styled from 'styled-components';
import useSummonData from '../../hooks/useSummonData';
import { getXPRequired, RarityClasses } from '../../utils/rarityHelper';
import useBalance from '../../hooks/useBalance';
import { gameState } from '../../contexts/Game';
import { BigNumber, BigNumberish, utils } from 'ethers';

const StyledProfilePicture = styled.div`
  padding: 0 0;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`

const StyledUsername = styled.div`
  padding: 0.2rem;
`

const StyledClass = styled.div`
  margin-top: 5px;
  opacity: 0.5;
  font-size: 12px;
`

const StyledRow = styled.div`
  margin-top: 0.1rem;
  display: flex;
  justify-content: space-between;
  font-size: small;
`

const StyledWrapper = styled.div`
    width: 10%;
    position: fixed;
    left: 0;top: 0;
    
    display: flex;
    flex-direction: column;
    align-items: stretch;
  
    margin-top: 1rem;
    margin-left: 1rem;
  
`

const StyledHeader = styled.div`
  padding: 0.5rem 0.5rem;
  font-size: 70%;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .class-label {
    opacity: .5;
  }
`

const StyledBody = styled.div`
  padding: 0.5rem 0.5rem;
  font-size: 70%;
  
  display: flex;
  flex-direction: column;
  align-items: stretch;
  
  .row {
    display: flex;
    justify-content: space-between;
    
    padding-top: 5px;
  }
`

const ProfilePanel = () => {
  const {level, summonClass, xp} = useSummonData()
  const balance = useBalance()

  useEffect(() => {

  }, [])

  const getXP = () => {
    if(xp.length <= 0) return "0" ;

    let x = BigNumber.from(xp).div(BigNumber.from(10).pow(18))

    return x.toString()
  }

  const getPercentBar = () => {
    const currentXP = getXP()
    const requiredXP = getXPRequired(Number(level))

    const progress = BigNumber.from(currentXP).div(requiredXP).mul(100)

    return progress
  }

  return (
    <StyledWrapper className={'panel sm-blur no-transparent'}>
      <StyledHeader className={'panel title'}>
        <span>Player</span>
        <span>#{gameState.currentTokenId}</span>
      </StyledHeader>
      <StyledBody className={'panel'}>
        <div className={'row'}>
          <div>
            Class
          </div>
          <div>
            {RarityClasses[summonClass]}
          </div>
        </div>
        <div className={'row'}>
          <div>
            Level
          </div>
          <div>
            {level}
          </div>
        </div>

        <div className={'row'}>
          <div>
            Gold
          </div>
          <div>
            {balance}
          </div>
        </div>

        <div className={'row'}>
          <div className={'bar'}>
            <div className={'title'}>
              {`${getXP()} / ${getXPRequired(Number(level))} XP`}
            </div>
            <div className={'progress'} style={{ width: `${getPercentBar().toString()}%` }} />
          </div>
        </div>
      </StyledBody>

    </StyledWrapper>
  )
}

export default ProfilePanel