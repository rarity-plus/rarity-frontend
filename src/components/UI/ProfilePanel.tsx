import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledProfilePicture = styled.div`
  padding: 0 0;
`

const StyledUsername = styled.div`

`

const StyledClass = styled.div`
  margin-top: 5px;
  opacity: 0.5;
  font-size: 15px;
`

const StyledLevel = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`

const ProfilePanel = () => {

  useEffect(() => {

  }, [])

  return (
    <div className={'panel black'} style={{position: "fixed",margin: '10px 10px', left: "0", top: "0", width: "25vh", height: "10vh", display: "flex", alignItems: "stretch"}}>
      <StyledProfilePicture className={'panel black'}>
        <img src={'/imgs/noAvatar.png'} width={'50'} />
      </StyledProfilePicture>

      <div style={{display: "flex",width: "100%", flexDirection: "column", padding: "3px 10px"}}>
        <StyledUsername>Username</StyledUsername>
        <StyledClass>Class</StyledClass>
        <StyledLevel>
          <span>Level</span>
          <span>1</span>
        </StyledLevel>
      </div>
    </div>
  )
}

export default ProfilePanel