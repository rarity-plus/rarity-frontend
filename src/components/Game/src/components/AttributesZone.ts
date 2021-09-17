import Phaser from 'phaser';
import { IGameObject } from '../interfaces/IGameObject';
import { IInteract } from '../interfaces/IInteract';
import MainScene from '../MainScene';
import { modal } from '../../../../contexts/Modal';
import AttributesModal from '../../../../modals/AttributesModal';


class AttributesZone extends Phaser.GameObjects.GameObject implements IGameObject, IInteract {

  zone;

  constructor(scene) {
    super(scene, "AttributesZone");


  }

  onInteract(): void {
      modal.show("Attributes Totem", AttributesModal, false)
  }


  onCollide(collider: Phaser.GameObjects.GameObject | undefined): void {
  }

  onCollisionEnter(collider: Phaser.GameObjects.GameObject | undefined): void {
  }

  onCollisionExit(collider: Phaser.GameObjects.GameObject | undefined): void {
  }

  //TODO: Find a naming standard
  onCreate(): void {
    let mainScene = this.scene as MainScene

    let abillitiesZone = mainScene.tileMap.findObject("Objects", (value, index) => {
      return value.name === "AbillitiesZone"
    })

    this.zone = this.scene.add.zone(abillitiesZone.x + 17, abillitiesZone.y + 20, abillitiesZone.width, abillitiesZone.height)
    this.scene.physics.world.enable(this.zone, 0)
    this.zone.body.setAllowGravity(false)
    this.zone.body.moves = false

    //TODO: Find a better way to do collision
    this.scene.physics.add.overlap(mainScene.worldGameObjects['player'], this.zone, () => {
      ((mainScene.worldGameObjects['player'] as unknown) as IGameObject)?.onCollisionEnter(this)
    })

    this.zone.on('enterzone', () => {
      ((mainScene.worldGameObjects['player'] as unknown) as IGameObject)?.onCollisionEnter(this)
    })

    this.zone.on('leavezone', () => {
      ((mainScene.worldGameObjects['player'] as unknown) as IGameObject)?.onCollisionExit(this)
    })


  }



  onUpdate(delta: number): void {
    let touching = this.zone.body.touching
    let wasTouching = this.zone.body.wasTouching
    if (touching.none && !wasTouching.none) {
      this.zone.emit('leavezone');
    }
    else if (!touching.none && wasTouching.none) {
      this.zone.emit('enterzone');
    }
  }


}

export default AttributesZone