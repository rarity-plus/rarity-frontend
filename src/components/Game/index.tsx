import React, { createElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Phaser from 'phaser'
import { IonPhaser, GameInstance } from '@ion-phaser/react'
import MainScene from './src/MainScene';

import { makeAutoObservable } from 'mobx';
import { observer } from "mobx-react-lite"

import { modal } from '../../contexts/Modal';

const GameWrapperPanel = styled.div`
  padding: 0 0;
`

class Communication {
  counter = 0

  constructor() {
    makeAutoObservable(this)
  }

  increment = () => {
    this.counter++
    return this.counter
  }

  decrement = () => {
    this.counter++
    return this.counter
  }

}

export const myComm = new Communication()

const Game = observer(() => {


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
      height: (panelRef.current as any).clientHeight,
      width: (panelRef.current as any).clientWidth,
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
    <GameWrapperPanel ref={panelRef} className={`game panel black`} >
      <IonPhaser ref={gameRef} game={game} initialize={initialize} />
    </GameWrapperPanel>
  )
})

export default Game