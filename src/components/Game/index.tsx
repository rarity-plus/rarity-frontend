import React, { createElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Phaser from 'phaser'
import { IonPhaser, GameInstance } from '@ion-phaser/react'
import MainScene from './src/MainScene';
import useModal from '../../hooks/useModal';

import { makeAutoObservable } from 'mobx';
import { observer } from "mobx-react-lite"

const GameWrapperPanel = styled.div`
  padding: 0 0;
`

class Communication {
  counter = 0

  constructor() {
    makeAutoObservable(this, {

    })
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

  const {show} = useModal()

  const adventureBoardModal = createElement(() => {
    return (
      <h1>Start an adventure</h1>
    )
  })

  const panelRef = useRef(null)

  const gameRef = useRef<HTMLIonPhaserElement>(null)

  const [game, setGame] = useState<GameInstance>({
    width: "100%",
    height: "100%",
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

  const [initialize, setInitialize] = useState(false)

  useEffect(() => {
    setGame((prevState) => ({...prevState, height: (panelRef.current as any).clientHeight, width: (panelRef.current as any).clientWidth}))

    setInitialize(true)



    return () => {
      if(gameRef.current){
        gameRef.current.destroy()
      }
    }
  }, [])


  // useEffect(() => {
  //   gameRef.current.game.instance.events.on('OPEN_MODAL', (e) => {
  //     console.log("Opening Modal")
  //     show({
  //       modalTitle: "Start an adventure",
  //       modalBody: adventureBoardModal,
  //       important: false
  //     })
  //   })
  // }, [gameRef.current])

  return (
    <GameWrapperPanel ref={panelRef} className={`game panel black`} >
      {myComm.counter}
      <IonPhaser ref={gameRef} game={game} initialize={initialize} />
    </GameWrapperPanel>
  )
})

export default Game