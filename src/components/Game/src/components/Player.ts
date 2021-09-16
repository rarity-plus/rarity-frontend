import Phaser from 'phaser';
import { IGameObject } from '../interfaces/IGameObject';
import MainScene from '../MainScene';

import { modal } from '../../../../contexts/Modal';
import AdventureModal from '../../../../modals/AdventureModal';
import { isInteractable } from '../interfaces/IInteract';

class Player extends Phaser.GameObjects.Sprite implements IGameObject{

  private keyW: Phaser.Input.Keyboard.Key;

  // keyboard key for moving left
  private keyA: Phaser.Input.Keyboard.Key;

  // keyboard key for moving down
  private keyS: Phaser.Input.Keyboard.Key;

  // keyboard key for moving right
  private keyD: Phaser.Input.Keyboard.Key;
  private keyInteract: Phaser.Input.Keyboard.Key;

  private interactTextLabel:  Phaser.GameObjects.Text;
  inAdventureZone: boolean;

  collidedObject: any

  private readonly sceneRef: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    this.sceneRef = scene

    this.name = "Player"

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)

    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyS = this.scene.input.keyboard.addKey("S");
    this.keyD = this.scene.input.keyboard.addKey("D");
    this.keyInteract = this.scene.input.keyboard.addKey("E")

    this.anims.create({
      key: "idle",
      frameRate: 8,
      frames: this.anims.generateFrameNames("player", {
        prefix: "LightBandit_Idle_",
        start: 0,
        end: 3
      }),
      repeat: -1
    });

    this.anims.create({
      key: "run",
      frameRate: 8,
      frames: this.anims.generateFrameNames("player", {
        prefix: "LightBandit_Run_",
        start: 0,
        end: 5
      }),
      repeat: -1
    });

    this.getBody().setSize(10,10)
    this.getBody().offset = new Phaser.Math.Vector2(20,35)

  }

  onCreate() {
    //Get scene ref
    let mainScene = this.sceneRef as MainScene

    //Set camera
    this.sceneRef.cameras.main.setBounds(
      0,
      0,
      mainScene.tileMap.widthInPixels,
      mainScene.tileMap.heightInPixels
    );
    this.sceneRef.cameras.main.setZoom(2);
    this.sceneRef.cameras.main.startFollow(this, true, 0.1, 0.1);

    //Fetch the layers
    let bottomLayer = mainScene.worldLayers['BottomLayer']
    let middleLayer = mainScene.worldLayers['MiddleLayer']

    //Set collision
    mainScene.physics.add.collider(this, bottomLayer)
    mainScene.physics.add.collider(this, middleLayer)

    //Fetch the spawn point
    let spawnPoint = mainScene.tileMap.findObject("Objects", (value) => {
        return value.name === "SpawnPoint"
    })

    //Move the player at the spawn point
    this.setPosition(spawnPoint.x , spawnPoint.y)

    this.interactTextLabel = this.sceneRef.add.text(this.x, this.y, 'Press `E` to interact')
    this.interactTextLabel.setVisible(false)
    this.interactTextLabel.setDisplaySize(this.interactTextLabel.width / 2, this.interactTextLabel.height / 2)
  };

  onCollisionEnter(obj) {
    this.collidedObject = obj
  }

  onCollisionExit(obj) {
    if(isInteractable(this.collidedObject)) {
      this.inAdventureZone = false

      this.interactTextLabel.setVisible(false)
    }

    this.collidedObject = null
  }


  onUpdate() {
    if(this.collidedObject){
      this.interactTextLabel.setVisible(true)
      this.interactTextLabel.setPosition(this.x - 30, this.y -30)

      if(this.keyInteract.isDown && this.collidedObject){
        if(isInteractable(this.collidedObject)){
          this.collidedObject.onInteract()
        }else{
          console.log("Not interactable")
        }
        // this.showAdventureModal()
      }
    }

    // if(this.textLabel){
    //   this.textLabel.setPosition(this.x - 10, this.y - 20)
    // }

    if (this.keyW.isDown) {
      this.getBody().setVelocity(0, -80);
    } else if (this.keyA.isDown) {
      this.getBody().setVelocity(-80, 0);
    } else if (this.keyS.isDown) {
      this.getBody().setVelocity(0, 80);
    } else if (this.keyD.isDown) {
      this.getBody().setVelocity(80, 0);
    } else {
      this.getBody().setVelocity(0, 0);
    }

    if (this.getBody().velocity.x > 0) {
      this.setFlipX(true);
    } else if (this.getBody().velocity.x < 0) {
      this.setFlipX(false);
    }

    if (this.getBody().velocity.x === 0 && this.getBody().velocity.y === 0) {
      this.anims.play("idle", true);
    } else {
      this.anims.play("run", true);
    }
  }

  onCollide() {
    console.log("Player Collided")
  }

  private getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }


}


export default Player