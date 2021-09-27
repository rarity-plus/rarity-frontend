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

const ProfilePanel = () => {
  const {level, summonClass} = useSummonData()
  const balance = useBalance()

  useEffect(() => {

  }, [])

  return (
    <div className={'panel sm-blur'} style={{position: "fixed",margin: '10px 10px', left: "0", top: "0", width: "25vh", height: "10vh", display: "flex", alignItems: "stretch"}}>
      {/*<StyledProfilePicture className={'panel black'}>*/}
      {/*  <img src={'/imgs/noAvatar.png'} width={'70'} />*/}
      {/*</StyledProfilePicture>*/}

      <div style={{display: "flex",width: "100%", justifyContent: 'space-between' , flexDirection: "column", padding: "3px 10px"}}>
        <StyledUsername>Username</StyledUsername>
        <StyledClass>{RarityClasses[summonClass]}</StyledClass>
        <StyledRow>
          <div className={'bar'}>
            <div className={'title'}>
               200XP/20XP
            </div>
            <div className={'progress'} style={{ width: '100%' }} />
          </div>
        </StyledRow>
        <StyledRow>
          <span>Level</span>
          <span>{level}</span>
        </StyledRow>
        <StyledRow>
          <span>Gold</span>
          <span>{balance}</span>
        </StyledRow>
      </div>
    </div>
  )
}

export default ProfilePanel