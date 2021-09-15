import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Phaser from 'phaser'
import { IonPhaser, GameInstance } from '@ion-phaser/react'

import MainScene from './src/MainScene';

const GameWrapperPanel = styled.div`
  padding: 0 0;
`

const Game = () => {

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
    },
    scene: MainScene
  })

  const [initialize, setInitialize] = useState(false)

  useEffect(() => {
    setGame((prevState) => ({...prevState, height: (panelRef.current as any).clientHeight, width: (panelRef.current as any).clientWidth}))

    setInitialize(true)

    return () => {
      if(gameRef.current){
        console.log("Destroy")
        gameRef.current.destroy()
      }
    }
  }, [])


  useEffect(() => {
    // if (initialize) {
    //   setGame(Object.assign({}, gameConfig))
    // }
  }, [initialize])

  return (
    <GameWrapperPanel ref={panelRef} className={`game panel black`} >
      <IonPhaser ref={gameRef} game={game} initialize={initialize} />
    </GameWrapperPanel>
  )
}

export default Game