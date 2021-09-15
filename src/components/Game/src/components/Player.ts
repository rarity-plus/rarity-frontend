import Phaser from 'phaser';

class Player extends Phaser.GameObjects.Sprite {

  private keyW: Phaser.Input.Keyboard.Key;

  // keyboard key for moving left
  private keyA: Phaser.Input.Keyboard.Key;

  // keyboard key for moving down
  private keyS: Phaser.Input.Keyboard.Key;

  // keyboard key for moving right
  private keyD: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "/logo192.png");

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)

    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyS = this.scene.input.keyboard.addKey("S");
    this.keyD = this.scene.input.keyboard.addKey("D");

  }

  public update(delta: number):void {
    if (this.keyW.isDown) {
      this.getBody().setVelocity(0, -64);
    } else if (this.keyA.isDown) {
      this.getBody().setVelocity(-64, 0);
    } else if (this.keyS.isDown) {
      this.getBody().setVelocity(0, 64);
    } else if (this.keyD.isDown) {
      this.getBody().setVelocity(64, 0);
    } else {
      this.getBody().setVelocity(0, 0);
    }
  }

  private getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }


}

export default Player