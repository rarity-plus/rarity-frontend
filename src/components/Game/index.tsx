import React, { createElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { observer } from "mobx-react-lite"
import GameEntry from './src/GameEntry';

const GameWrapperPanel = styled.div`
  width: auto;
  height: auto;
  max-height: 100vh;
  overflow: hidden;
`

const Game = observer(({children}) => {
  const canvasRef = useRef<HTMLDivElement>(null)

  const [game, setGame] = useState<GameEntry>(null)

  useEffect(() => {
    if(!game) {
      const gameEntry = new GameEntry(canvasRef.current)

      setGame(gameEntry)
    }

    const resize = () => {
      if(game){
        game.engineResize();
      }
    }

    window.addEventListener('resize', resize);

    return () => {
      if(game){
        game.engineDispose()
      }

      if(window){
        window.removeEventListener('resize', resize)
      }
    }
  }, [])

  return (
    <GameWrapperPanel>
      {children}

      <div ref={canvasRef} style={{width: "100%", height: "100vh"}}>

      </div>
    </GameWrapperPanel>
  )
})

export default Game