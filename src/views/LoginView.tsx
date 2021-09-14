import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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

const LoginView: React.FC = () => {

  return (
    <div className={'container'}>
      <StyledWrapper>
        <Logo className={'logo'}>Rarity</Logo>

        <StyledLoginWrapper className={'panel black'}>
          <Link to={'/character'} className={'btn'}>Connect</Link>
        </StyledLoginWrapper>
      </StyledWrapper>
    </div>
  );
}


export default LoginView;
