import React, { createElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, Mesh } from 'babylonjs';
import { observer } from "mobx-react-lite"
import GameEntry from './src/GameEntry';

const GameWrapperPanel = styled.div`
  width: auto;
  height: auto;
  max-height: 100vh;
  overflow: hidden;
`

const Game = observer(({children}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [game, setGame] = useState<GameEntry>(null)
  const [engine, setEngine] = useState<Engine>()


  useEffect(() => {
    const _engine = new Engine(canvasRef.current, true, {preserveDrawingBuffer: true, stencil: true})

    setEngine(_engine);

    if(_engine) {
      const gameEntry = new GameEntry(_engine, canvasRef.current)

      setGame(gameEntry)
    }


    window.addEventListener('resize', function(){
      if(_engine){
        _engine.resize();
      }
    });

    return () => {
      if(_engine){
        _engine.dispose()
      }
    }
  }, [])

  return (
    <GameWrapperPanel>
      {children}

      <canvas ref={canvasRef} style={{width: "100%", height: "100vh"}}>

      </canvas>
    </GameWrapperPanel>
  )
})

export default Game