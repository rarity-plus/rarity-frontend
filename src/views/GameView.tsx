import React, { useState, useEffect, createElement } from 'react';
import Header from '../components/Header';
import Game from '../components/Game';
import UI from '../components/UI';
import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';

const StyledDiv = styled.div`
  
`

const GameView: React.FC = () => {
  const history = useHistory()
  const {account} = useWeb3React()

  useEffect(() => {
    if(!account){
      history.push("/")

    }
  }, [account, history])

  return (
    <StyledDiv>
        {/*<Header />*/}
        <UI />
        <Game />
    </StyledDiv>
  );
}


export default GameView;
