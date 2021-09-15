import Phaser from 'phaser';
import Player from './components/Player';

class MainScene extends Phaser.Scene {

  private player: Player;

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

    const bottomLayer = map.createLayer('BottomLayer', tileset)

    const bottomVisualLayer = map.createLayer('BottomVisualLayer', tileset)

    const middleLayer = map.createLayer('MiddleLayer', tileset)
    middleLayer.setCollisionBetween(0, 1991, true)

    this.player = new Player(this, spawnPoint.x, spawnPoint.y)
    this.physics.add.collider(this.player, bottomLayer)
    this.physics.add.collider(this.player, middleLayer)

    const topLayer = map.createLayer('TopLayer', tileset)

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

  update (delta) {
      this.player.update(delta)
  }
}

export default MainScene