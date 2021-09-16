import Phaser from 'phaser';

export interface IGameObject {
  onCreate: () => void,
  afterCreate?: () => void,
  onUpdate: (delta: number) => void,
  onGUI?: () => void,
  onCollide?: (collider?: Phaser.GameObjects.GameObject) => void
}

