import Phaser from 'phaser';

export interface IGameObject {
  onCreate: () => void,
  afterCreate?: () => void

  onUpdate: (delta: number) => void,
  onGUI?: () => void
}