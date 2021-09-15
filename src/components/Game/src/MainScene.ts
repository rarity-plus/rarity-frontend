import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
  private helloWorld!: Phaser.GameObjects.Text
  private player?: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({});
  }

  init () {
    this.cameras.main.setBackgroundColor('#24252A')

    console.log("Init")
  }

  preload() {
    this.load.image('logo', '/logo192.png');
  }

  create () {
    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
    this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);

    this.player = this.physics.add.image(400, 300, 'logo');

    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    this.cursors = this.input.keyboard.createCursorKeys();



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
    if(this.player && this.cursors){
      this.player.setVelocity(0);

      if (this.cursors.left.isDown)
      {
        this.player.setVelocityX(-500);
      }
      else if (this.cursors.right.isDown)
      {
        this.player.setVelocityX(500);
      }

      if (this.cursors.up.isDown)
      {
        this.player.setVelocityY(-500);
      }
      else if (this.cursors.down.isDown)
      {
        this.player.setVelocityY(500);
      }
    }
    this.helloWorld.angle += 1;
  }
}

export default MainScene