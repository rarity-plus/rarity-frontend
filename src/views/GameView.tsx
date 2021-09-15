import React, { useState, useEffect, createElement } from 'react';
import Header from '../components/Header';
import Game from '../components/Game';
import UI from '../components/UI';
import useModal from '../hooks/useModal';

import { Modal } from '../contexts/Modal';

const GameView: React.FC = () => {

  // const {show} = useModal()
  //
  // const testModal = createElement(() => {
  //
  //   return (
  //     <h1>
  //       Test Modal
  //     </h1>
  //   )
  // })
  //
  // useEffect(() => {
  //   show({
  //     modalTitle: "Hello World",
  //     modalBody: testModal,
  //     important: false
  //   })
  // }, [])

  return (
    <div className={'game-container'}>
        <Header />
        <Game />
        <UI />
    </div>
  );
}


export default GameView;
