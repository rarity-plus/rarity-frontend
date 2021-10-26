import React, { useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import { useWeb3React } from '@web3-react/core';
import Loading from '../components/Loading';
import { gameState } from '../contexts/Game';

const StyledLoginWrapper = styled.div`
  width: 100%;
  padding: 1rem 1rem;
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 10%;
`

const Logo = styled.h1`
  font-size: 3rem;
  padding: 1em 1em;
`

const StyledConnectButton = styled.button`
  width: 100%;
`

const LoginView: React.FC = () => {
  const { login } = useAuth()
  const {account} = useWeb3React()
  const history = useHistory()

  const connectHandle = () => {
      login()
  }

  useEffect(() => {
    if(account){
      gameState.setEthAddress(account)

      history.push("/character")
    }
  }, [account])

  return (
    <div className={'container'}>
      <StyledWrapper>
        <Logo className={'logo'}>rarity.plus</Logo>

        <StyledLoginWrapper className={'panel black'}>
          <StyledConnectButton onClick={connectHandle} className={'btn'}>Connect</StyledConnectButton>
        </StyledLoginWrapper>
      </StyledWrapper>
    </div>
  );
}


export default LoginView;
