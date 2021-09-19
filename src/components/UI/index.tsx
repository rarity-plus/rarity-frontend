import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs } from '../Tabs';
import { observer } from 'mobx-react-lite';

import { gameState } from '../../contexts/Game';
import useSummonData from '../../hooks/useSummonData';
import { RarityClasses } from '../../utils/rarityHelper';
import useWeb3 from '../../hooks/useWeb3';
import AttributesTab from './AttributesTab';
import useBalance from '../../hooks/useBalance';

const CharacterInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const CharacterTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  margin-bottom: 1em;
`

const StyledUI = styled.div`
    z-index: 10;
    position: fixed;
  
`

const StyledUIWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

//TODO: Probably using position:relative is better than using position:fixed
const UI = observer(() => {
  const {level, summonClass} = useSummonData()
  const balance = useBalance()

  return (
    <StyledUI>
      <div className={'panel black'} style={{pointerEvents: "none",position: "fixed",margin: '10px 10px', left: "0", top: "0", width: "25vh", height: "10vh", display: "flex", alignItems: "stretch"}}>
          <div className={'panel'}>
            Avatar
          </div>

          <div style={{display: "flex", flexDirection: "column", padding: "2px 2px"}}>
            <h1>Username</h1>
            <h2>Class</h2>
            <h3>Level</h3>
          </div>
      </div>

        <div className={'panel black'} style={{position: "fixed",margin: '10px 10px', right: "0", bottom: "0", width: "50vh", height: "5vh", display: "flex", alignItems: "center"}}>
          <button className={'btn'} style={{height: '100%'}}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{height: 'auto', width: '2vh'}} className="" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
            </svg>
          </button>
        </div>


      {/*<div className={'panel'}>*/}
      {/*  <CharacterTitle className={'panel title'}>*/}
      {/*    <h1>{RarityClasses[summonClass]}</h1>*/}
      {/*  </CharacterTitle>*/}
      {/*  <CharacterInfo className={'panel black'}>*/}
      {/*    <span>Level</span>*/}
      {/*    <span>{level}</span>*/}
      {/*  </CharacterInfo>*/}
      {/*  <CharacterInfo className={'panel black'}>*/}
      {/*    <span>Gold</span>*/}
      {/*    <span>{balance}</span>*/}
      {/*  </CharacterInfo>*/}
      {/*</div>*/}


      {/*<Tabs>*/}
      {/*  <Tab title="Inventory">Inventory</Tab>*/}
      {/*  <Tab title="Attributes"><AttributesTab /></Tab>*/}
      {/*</Tabs>*/}

    </StyledUI>
  )
})

export default UI