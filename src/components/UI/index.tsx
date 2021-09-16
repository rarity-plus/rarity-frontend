import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs } from '../Tabs';
import { observer } from 'mobx-react-lite';

import { gameState } from '../../contexts/Game';
import useSummonData from '../../hooks/useSummonData';
import { RarityClasses } from '../../utils/rarityHelper';
import useWeb3 from '../../hooks/useWeb3';
import SkillsTab from './SkillsTab';
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



const UI = observer(() => {
  const {level, summonClass} = useSummonData()
  const balance = useBalance()

  return (
    <div className={`ui panel black`}>
      <div className={'panel'}>
        <CharacterTitle className={'panel title'}>
          <h1>{RarityClasses[summonClass]}</h1>
        </CharacterTitle>
        <CharacterInfo className={'panel black'}>
          <span>Level</span>
          <span>{level}</span>
        </CharacterInfo>
        <CharacterInfo className={'panel black'}>
          <span>Gold</span>
          <span>{balance}</span>
        </CharacterInfo>
      </div>


      <Tabs>
        <Tab title="Inventory">Inventory</Tab>
        <Tab title="Skills"><SkillsTab /></Tab>
      </Tabs>

    </div>
  )
})

export default UI