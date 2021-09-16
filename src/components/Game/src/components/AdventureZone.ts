import Phaser from 'phaser';
import { IGameObject } from '../interfaces/IGameObject';
import MainScene from '../MainScene';

import { modal } from '../../../../contexts/Modal';
import { adventureModal } from './modals';

class AdventureZone extends Phaser.GameObjects.GameObject implements IGameObject{

  sceneRef: Phaser.Scene;
  debug: boolean;

  collidingObject: Phaser.GameObjects.GameObject;
  rectangle:  Phaser.GameObjects.Rectangle;
  zone;

  constructor(scene, debug?: boolean) {
    super(scene, "AdventureZone");
    this.sceneRef = scene

    if(debug){
      this.debug = true
    }
  }

  public onCollide() {

  }

  onCreate() {
    let mainScene = this.sceneRef as MainScene

    let adventureBoard = mainScene.tileMap.findObject("Objects", (value, index) => {
         return value.name === "AdventureBoard"
    })

    this.zone= this.sceneRef.add.zone(adventureBoard.x + 17, adventureBoard.y + 20, adventureBoard.width, adventureBoard.height)
    this.sceneRef.physics.world.enable(this.zone, 0)
    this.zone.body.setAllowGravity(false)
    this.zone.body.moves = false

    this.sceneRef.physics.add.overlap(mainScene.worldGameObjects['player'], this.zone, () => {
      ((mainScene.worldGameObjects['player'] as unknown) as IGameObject)?.onCollisionEnter(this)
    })

    this.zone.on('enterzone', () => {
      ((mainScene.worldGameObjects['player'] as unknown) as IGameObject)?.onCollisionEnter(this)
    })

    this.zone.on('leavezone', () => {
      ((mainScene.worldGameObjects['player'] as unknown) as IGameObject)?.onCollisionExit(this)
      console.log("L")
    })
  }

  onUpdate() {
    let touching = this.zone.body.touching
    let wasTouching = this.zone.body.wasTouching
    if (touching.none && !wasTouching.none) {
      this.zone.emit('leavezone');
    }
    else if (!touching.none && wasTouching.none) {
      this.zone.emit('enterzone');
    }

    // if(this.rectangle){
    //   var x = this.rectangle.x - (this.rectangle.width / 2);
    //   var y = this.rectangle.y - (this.rectangle.height / 2);
    //   //
    //   var within = this.sceneRef.physics.overlapRect(x, y, this.rectangle.width, this.rectangle.height);
    //
    //   within.forEach(function (body) {
    //     if(this.collidingObject !== body){
    //       this.collidingObject = body.gameObject
    //     }
    //
    //     ((body.gameObject as unknown) as IGameObject).onCollide(this)
    //   }, this);
    //
    // }



  }

  checkOverlap (spriteA: any, spriteB: any) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
  }
}

export default AdventureZone