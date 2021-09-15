import Phaser from 'phaser';


class GenericZone extends Phaser.GameObjects.Rectangle {

  constructor(scene, x, y, width, height, debug?: boolean) {
    super(scene, x, y, width, height);

    if(debug){
        this.setStrokeStyle(2, 0xffff00)
    }
  }

  public onCollide() {

  }
}

export default GenericZone