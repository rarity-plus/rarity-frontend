import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs } from '../Tabs';



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



const UI = () => {
  return (
    <div className={`ui panel black`}>
      <div className={'panel'}>
        <CharacterTitle className={'panel title'}>
          <h1>Barbarian</h1>
        </CharacterTitle>
        <CharacterInfo className={'panel black'}>
          <span>Level</span>
          <span>1</span>
        </CharacterInfo>
        <CharacterInfo className={'panel black'}>
          <span>Gold</span>
          <span>100</span>
        </CharacterInfo>
      </div>

      <Tabs>
        <Tab title="Inventory">Inventory</Tab>
        <Tab title="Skills">Skills</Tab>
      </Tabs>

    </div>
  )
}

export default UI