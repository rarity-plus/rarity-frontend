import Phaser from 'phaser';

class Player extends Phaser.GameObjects.Sprite {

  private keyW: Phaser.Input.Keyboard.Key;

  // keyboard key for moving left
  private keyA: Phaser.Input.Keyboard.Key;

  // keyboard key for moving down
  private keyS: Phaser.Input.Keyboard.Key;

  // keyboard key for moving right
  private keyD: Phaser.Input.Keyboard.Key;

  private textLabel:  Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    this.name = "Player"

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)

    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyS = this.scene.input.keyboard.addKey("S");
    this.keyD = this.scene.input.keyboard.addKey("D");

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

  public createTextOverlay() {
    this.textLabel = this.scene.add.text(this.x - 10, this.y - 10, 'Player');
    this.textLabel.setDisplaySize(this.textLabel.width / 2,this.textLabel.height / 2)
  }

  public update(delta: number):void {
    if(this.textLabel){


      this.textLabel.setPosition(this.x - 10, this.y - 20)
    }

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

  private getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }


}

export default Player