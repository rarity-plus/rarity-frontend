import React, { createElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Phaser from 'phaser'
import { IonPhaser, GameInstance } from '@ion-phaser/react'
import MainScene from './src/MainScene';

import { makeAutoObservable } from 'mobx';
import { observer } from "mobx-react-lite"

import { modal } from '../../contexts/Modal';

const GameWrapperPanel = styled.div`
  width: auto;
  height: auto;
  
  max-height: 100vh;
  
  overflow: hidden;
`

const Game = observer(({children}) => {


  const adventureBoardModal = createElement(() => {
    return (
      <h1>Start an adventure</h1>
    )
  })

  const panelRef = useRef(null)

  const gameRef = useRef<HTMLIonPhaserElement>(null)

  const [game, setGame] = useState<GameInstance>()

  const [initialize, setInitialize] = useState(false)

  useEffect(() => {
    if(initialize){
      return;
    }

    setGame({
      height: panelRef.current.clientHeight,
      width: panelRef.current.clientWidth,
      type: Phaser.AUTO,
      render: {
        antialias: false,
        antialiasGL: false,
        pixelArt: true,
        roundPixels: false
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: true
        }
      },
      scene: MainScene
    })

    setInitialize(true)

    return () => {
      if(gameRef.current){
        gameRef.current.destroy()
      }
    }
  }, [])

  return (
    <GameWrapperPanel ref={panelRef}>
      {children}
        <canvas id="myCanvas" style={{border: "5px solid #fff", width: "100%", height: "100vh"}}>
      </canvas>

    </GameWrapperPanel>
  )
})

export default Game