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
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const gameInstance = useRef<GameEntry>();

  const [inspectorState, setInspectorState] = useState(false)

  useEffect(() => {
    if(!gameInstance.current) {
      gameInstance.current = new GameEntry(canvasRef.current)

      window.addEventListener("keydown", (event) => {
        const keyName = event.key;

        if(keyName === '9'){
          if(inspectorState){
            gameInstance.current.setInspectorState(false)
            setInspectorState(false)
          }else{
            gameInstance.current.setInspectorState(true)
            setInspectorState(true)
          }
        }

      })
    }

    const resize = () => {
      if(gameInstance.current){
        gameInstance.current.engineResize();
      }
    }

    window.addEventListener('resize', resize);

    return () => {
      if(gameInstance.current){
        gameInstance.current.engineDispose()
      }

      if(window){
        window.removeEventListener('resize', resize)
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