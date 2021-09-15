import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Game from '../components/Game';
import UI from '../components/UI';


const GameView: React.FC = () => {

  return (
    <div className={'game-container'}>
        <Header />
        <Game />
        <UI />
    </div>
  );
}


export default GameView;
