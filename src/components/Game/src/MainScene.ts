import Phaser from 'phaser';
import Player from './components/Player';
import { IGameObject } from './interfaces/IGameObject';
import AdventureZone from './components/AdventureZone';

import { myComm } from '../index';

class MainScene extends Phaser.Scene {

  private player: Player;

  private adventureBoardReact: Phaser.GameObjects.Rectangle;

  public worldGameObjects: {[key: string]: Phaser.GameObjects.GameObject} = {}

  public worldLayers: {
      [key: string]:  Phaser.Tilemaps.TilemapLayer
  } = {}

  public tileMap: Phaser.Tilemaps.Tilemap;
  public tileSet:  Phaser.Tilemaps.Tileset;

  constructor() {
    super("MainScene");
  }

  init () {
    this.cameras.main.setBackgroundColor('#24252A')

  }

  preload() {
    this.load.atlas('player', '/assets/sprites/player.png', '/assets/sprites/player.json')
    this.load.image('tileset', '/assets/maps/tileset.png')
    this.load.tilemapTiledJSON('tilemap', '/assets/maps/map.json')

  }

  loadMap() {
      //Load Map
      this.tileMap = this.make.tilemap({key: 'tilemap'})
      this.tileSet = this.tileMap.addTilesetImage('tiles', 'tileset')

      //TODO: All the layer creation needs to be smarter
      this.worldLayers['BottomLayer'] = this.tileMap.createLayer('BottomLayer', this.tileSet)
      this.worldLayers['BottomVisualLayer'] = this.tileMap.createLayer('BottomVisualLayer', this.tileSet)
      this.worldLayers['MiddleLayer'] = this.tileMap.createLayer('MiddleLayer', this.tileSet)
      this.worldLayers['MiddleLayer'].setCollisionBetween(0, 1991, true)

      //Create world game objects
      this.createWorldObject()

    // let adventureBoard = this.tileMap.findObject("Objects", (value, index) => {
    //   return value.name === "AdventureBoard"
    // })
    //
    // this.adventureBoardReact = this.add.rectangle(adventureBoard.x + 17, adventureBoard.y + 20, adventureBoard.width, adventureBoard.height).setStrokeStyle(2, 0xffff00);



    //Render last layer
      this.worldLayers['TopLayer'] = this.tileMap.createLayer('TopLayer', this.tileSet)

      //Set the physics world bounds
      this.physics.world.bounds.width = this.tileMap.widthInPixels;
      this.physics.world.bounds.height = this.tileMap.heightInPixels;

      //Call onCreate for world game objects
      for (let worldGameObjectsKey in this.worldGameObjects) {
        ((this.worldGameObjects[worldGameObjectsKey] as unknown) as IGameObject).onCreate()
      }

  }

  createWorldObject () {
      //Register world game objects
      this.worldGameObjects = {
          //Create the player
          "player": new Player(this, -10 , -10),
          "adventureZone": new AdventureZone(this, true)

      }
  }

  createWorldGUI() {

  }

  public openModal () {
    myComm.increment()
  }

  create () {
    this.loadMap()

    // const map = this.make.tilemap({key: 'tilemap'})
    // const tileset = map.addTilesetImage('tiles', 'tileset')
    //
    // // let spawnPoint = map.findObject("Objects", (value) => {
    // //     return value.name === "SpawnPoint"
    // // })
    // //
    // //
    // //

    //
    // const bottomLayer = map.createLayer('BottomLayer', tileset)
    //
    // const bottomVisualLayer = map.createLayer('BottomVisualLayer', tileset)
    //
    // const middleLayer = map.createLayer('MiddleLayer', tileset)
    // middleLayer.setCollisionBetween(0, 1991, true)
    //
    // this.player = new Player(this, spawnPoint.x, spawnPoint.y)
    // this.physics.add.collider(this.player, bottomLayer)
    // this.physics.add.collider(this.player, middleLayer)
    //
    // const topLayer = map.createLayer('TopLayer', tileset)
    //
    // const text1 = this.add.text(adventureBoard.x - 10, adventureBoard.y - 10, 'Adventure Board');
    // text1.setDisplaySize(text1.width / 2,text1.height / 2)
    //
     // this.physics.add.overlap(this.player, this.adventureBoardReact, () => {
    // //   console.log("Colided")
    // // }, () => {
    // //   console.log("Colided")
    // // })
    //
    // this.player.createTextOverlay()
    //
    // this.physics.world.bounds.width = map.widthInPixels;
    // this.physics.world.bounds.height = map.heightInPixels;
    //
    // this.cameras.main.setBounds(
    //   0,
    //   0,
    //   map.widthInPixels,
    //   map.heightInPixels
    // );
    // this.cameras.main.setZoom(2);
    // this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
  }

  checkOverlap(spriteA, spriteB) {
    // var boundsA = spriteA.getBounds();
    // var boundsB = spriteB.getBounds();
    // return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
  }

  update (delta) {
    for (let worldGameObjectsKey in this.worldGameObjects) {
      ((this.worldGameObjects[worldGameObjectsKey] as unknown) as IGameObject).onUpdate(delta)
    }
      // this.player.update(delta)

    // if(this.checkOverlap(this.player, this.adventureBoardReact)){
    //   console.log("Overlapping")
    // }



    // this.physics.overlap(this.player, this.adventureBoardReact , () => {
    //   console.log("Colided")
    // })

    // within.forEach(function (body) {
    //   (body.gameObject as Player).testInteract()
    // });
  }
}

export default MainScene