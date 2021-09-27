import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import useSummonData from '../../hooks/useSummonData';
import useBalance from '../../hooks/useBalance';
import { floatingPanelState } from '../../contexts/FloatingPanels/State';
import FloatingPanelsCanvas from '../../contexts/FloatingPanels/Canvas';

import ProfilePanel from './ProfilePanel';

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
      <FloatingPanelsCanvas />
        <ProfilePanel />

        <div className={'panel sm-blur'} style={{position: "fixed",margin: '10px 10px', right: "0", bottom: "0", width: "50vh", height: "5vh", display: "flex", alignItems: "center"}}>
          <button title={'Attributes'} onClick={() => {
            floatingPanelState.createFloatingPanel('testPanel')
          }} className={'btn'} style={{height: '100%'}}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{height: 'auto', width: '2vh'}} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </button>

          <button title={'Inventory'} onClick={() => {
            floatingPanelState.createFloatingPanel('superTestPanel')
          }} className={'btn'} style={{height: '100%'}}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{height: 'auto', width: '2vh'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
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