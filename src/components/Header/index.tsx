import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  height: 100%;
`

const NavLogo = styled.h1`
  font-size: x-large;
`

const NavButtons = styled.div`
  & > * {
    margin-left: 0.4em;
  }
`

const Header = () => {
  return (
    <div className={`header panel black`}>
        <StyledNav>
            <NavLogo className={'logo'}>Rarity</NavLogo>

            <NavButtons className={'flex'}>
              <Link to={'/character'} className={'btn'}>Change Character</Link>
              <Link to={'/'} className={'btn'}>Logout</Link>
            </NavButtons>
        </StyledNav>
    </div>
  )
}

export default Header