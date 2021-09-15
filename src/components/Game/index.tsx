import React, { useEffect, useRef, useState } from 'react';

import Phaser from 'phaser'
import { IonPhaser, GameInstance } from '@ion-phaser/react'

class MainScene extends Phaser.Scene {
  private helloWorld!: Phaser.GameObjects.Text

  init () {
    this.cameras.main.setBackgroundColor('#24252A')

    console.log("Game INIT")
  }

  create () {
    this.helloWorld = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "Hello World", {
        font: "40px Arial",
        color: "#ffffff"
      }
    );
    this.helloWorld.setOrigin(0.5);



  }
  update () {
    this.helloWorld.angle += 1;
  }
}

const gameConfig: GameInstance = {
  width: "100%",
  height: "100%",
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: '100%',
    height: '100%'
  },
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
};

const Game = () => {

  const panelRef = useRef(null)

  const gameRef = useRef<HTMLIonPhaserElement>(null)
  const [game, setGame] = useState<GameInstance>()
  const [initialize, setInitialize] = useState(false)

  useEffect(() => {
    setInitialize(true)
  })

  useEffect(() => {
    if (initialize) {
      setGame(Object.assign({}, gameConfig))
    }
  }, [initialize])

  return (
    <div ref={panelRef} className={`game panel black`} >
      <IonPhaser ref={gameRef} game={game} initialize={initialize} />
    </div>
  )
}

export default Game