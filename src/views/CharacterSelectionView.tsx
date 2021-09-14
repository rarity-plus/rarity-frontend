import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLoginWrapper = styled.div`
  width: 100%;
  padding: 1rem 1rem;
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Logo = styled.h1`
  font-size: 3rem;
  padding: 1em 1em;
`

const CharacterInfo = styled.div`
  padding: 0.5em 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  & > * {
    margin-top: 0.1em;
  }
`

const ChracterTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`

const CharacterId = styled.h2`
  font-size: small;
  opacity: 70%;
  margin-top: 0.5em;
`

const CharacterLevel = styled.span`
  font-size: small;
  font-weight: normal;
  align-self: start;
  margin-left: 0.2em;
  opacity: 80%;
`

const CharacterSelectionView: React.FC = () => {

  return (
    <div className={'container'}>
      <StyledWrapper>
        <Logo className={'logo'}>Select an character</Logo>

        <StyledLoginWrapper className={'panel black'}>
          <div className={'panel flex row justify-between'}>
            <CharacterInfo>
              <ChracterTitle>
                <span>Barbarian</span>
                <CharacterLevel>Level 1</CharacterLevel>
              </ChracterTitle>
              <CharacterId>#1554139</CharacterId>
            </CharacterInfo>

            <Link to={'/play'} className={'btn'}>Select</Link>
          </div>

          <div className={'panel flex row justify-between'}>
            <CharacterInfo>
              <ChracterTitle>
                <span>Archer</span>
                <CharacterLevel>Level 1</CharacterLevel>
              </ChracterTitle>
              <CharacterId>#1523139</CharacterId>
            </CharacterInfo>

            <Link to={'/play'} className={'btn'}>Select</Link>
          </div>

        </StyledLoginWrapper>

      </StyledWrapper>
    </div>
  );
}


export default CharacterSelectionView;