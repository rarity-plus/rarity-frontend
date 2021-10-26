import React from 'react';
import styled from 'styled-components';

const StyledLoadingWrapper = styled.div`
  width: 100%;
  opacity: .5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5rem .5rem;
  
  svg {
    width: 20%;

    -webkit-animation: rotate-center 0.6s cubic-bezier(0.445, 0.050, 0.550, 0.950) infinite both;
    animation: rotate-center 0.6s cubic-bezier(0.445, 0.050, 0.550, 0.950) infinite both;
  }


  @-webkit-keyframes rotate-center {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotate-center {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

`

const Loading = () => {

  return (
    <StyledLoadingWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </StyledLoadingWrapper>
  )
}

export default Loading