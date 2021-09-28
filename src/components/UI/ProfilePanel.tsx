import React, { useEffect } from 'react';
import styled from 'styled-components';
import useSummonData from '../../hooks/useSummonData';
import { RarityClasses } from '../../utils/rarityHelper';
import useBalance from '../../hooks/useBalance';

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
  const {level, summonClass} = useSummonData()
  const balance = useBalance()

  useEffect(() => {

  }, [])

  return (
    <StyledWrapper className={'panel sm-blur no-transparent'}>
      <StyledHeader className={'panel title'}>
        <span>Player</span>
        <span className={'class-label'}>{RarityClasses[summonClass]}</span>
      </StyledHeader>
      <StyledBody className={'panel'}>
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
              200XP/20XP
            </div>
            <div className={'progress'} style={{ width: '100%' }} />
          </div>
        </div>
      </StyledBody>

    </StyledWrapper>
  )
}

export default ProfilePanel