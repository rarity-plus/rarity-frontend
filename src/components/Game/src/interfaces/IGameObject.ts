import Phaser from 'phaser';

export interface IGameObject {
  onCreate: () => void,
  afterCreate?: () => void,
  onUpdate: (delta: number) => void,
  onGUI?: () => void,

  //Collision Detection
  onCollide?: (collider?: Phaser.GameObjects.GameObject) => void
  onCollisionEnter?: (collider?: Phaser.GameObjects.GameObject) => void
  onCollisionExit?: (collider?: Phaser.GameObjects.GameObject) => void
}

