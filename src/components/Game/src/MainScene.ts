import Phaser from 'phaser';

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

export default MainScene