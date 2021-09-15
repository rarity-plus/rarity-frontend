import Phaser from 'phaser';
import Player from './components/Player';

class MainScene extends Phaser.Scene {

  private player: Player;

 private adventureBoardReact: Phaser.GameObjects.Rectangle;

  constructor() {
    super("MainScene");
  }

  init () {
    this.cameras.main.setBackgroundColor('#24252A')

  }

  preload() {
    // this.load.image('player', '/')
    // this.load.atlas('', '')
    this.load.atlas('player', '/assets/sprites/player.png', '/assets/sprites/player.json')
    this.load.image('tileset', '/assets/maps/tileset.png')
    this.load.tilemapTiledJSON('tilemap', '/assets/maps/map.json')

  }

  create () {
    const map = this.make.tilemap({key: 'tilemap'})
    const tileset = map.addTilesetImage('tiles', 'tileset')

    let spawnPoint = map.findObject("Objects", (value) => {
        return value.name === "SpawnPoint"
    })



    let adventureBoard = map.findObject("Objects", (value, index) => {
      return value.name === "AdventureBoard"
    })

    const bottomLayer = map.createLayer('BottomLayer', tileset)

    const bottomVisualLayer = map.createLayer('BottomVisualLayer', tileset)

    const middleLayer = map.createLayer('MiddleLayer', tileset)
    middleLayer.setCollisionBetween(0, 1991, true)

    this.player = new Player(this, spawnPoint.x, spawnPoint.y)
    this.physics.add.collider(this.player, bottomLayer)
    this.physics.add.collider(this.player, middleLayer)

    const topLayer = map.createLayer('TopLayer', tileset)

    const text1 = this.add.text(adventureBoard.x - 10, adventureBoard.y - 10, 'Adventure Board');
    text1.setDisplaySize(text1.width / 2,text1.height / 2)

    this.adventureBoardReact = this.add.rectangle(adventureBoard.x + 17, adventureBoard.y + 20, adventureBoard.width, adventureBoard.height).setStrokeStyle(2, 0xffff00);
    this.physics.add.overlap(this.player, this.adventureBoardReact, () => {
      console.log("Colided")
    }, () => {
      console.log("Colided")
    })

    this.player.createTextOverlay()

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels,
      map.heightInPixels
    );
    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
  }

  checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
  }

  update (delta) {
      this.player.update(delta)

    // if(this.checkOverlap(this.player, this.adventureBoardReact)){
    //   console.log("Overlapping")
    // }
    // var x = this.adventureBoardReact.x - (this.adventureBoardReact.width / 2);
    // var y = this.adventureBoardReact.y - (this.adventureBoardReact.height / 2);
    //
    // var within = this.physics.overlapRect(x, y, this.adventureBoardReact.width, this.adventureBoardReact.height);
    //

    // this.physics.overlap(this.player, this.adventureBoardReact , () => {
    //   console.log("Colided")
    // })

    // within.forEach(function (body) {
    //   console.log(body.gameObject)
    // });
  }
}

export default MainScene