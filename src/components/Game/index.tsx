import React, { useEffect, useRef, useState } from 'react';

import Phaser from 'phaser'
import { IonPhaser, GameInstance } from '@ion-phaser/react'

import MainScene from './src/MainScene';

const Game = () => {

  const panelRef = useRef(null)

  const gameRef = useRef<HTMLIonPhaserElement>(null)

  const [game, setGame] = useState<GameInstance>({
    width: "100%",
    height: "100%",
    type: Phaser.AUTO,
    render: {
      antialias: true,
      pixelArt: true,
      roundPixels: false
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 400 },
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
    <div ref={panelRef} className={`game panel black`} >
      <IonPhaser ref={gameRef} game={game} initialize={initialize} />
    </div>
  )
}

export default Game