import React, { useEffect, useRef, useState } from 'react';

import Phaser from 'phaser'
import { IonPhaser, GameInstance } from '@ion-phaser/react'

class MainScene extends Phaser.Scene {
  private helloWorld!: Phaser.GameObjects.Text
  private image?: Phaser.GameObjects.Image;


  init () {
    this.cameras.main.setBackgroundColor('#24252A')

    console.log("Init")
  }

  preload() {
    this.load.image('logo', '/logo192.png');
  }

  create () {
    this.image = this.add.image(400, 300, 'logo');
    
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
    if(this.image){
      this.image.rotation += 0.01;
    }
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