import Phaser from 'phaser';
import Player from './components/Player';
import { IGameObject } from './interfaces/IGameObject';
import AdventureZone from './components/AdventureZone';

import { myComm } from '../index';
import AttributesZone from './components/AttributesZone';

class MainScene extends Phaser.Scene {

  private player: Player;

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
          "adventureZone": new AdventureZone(this, true),
          "attributesZone": new AttributesZone(this)
      }
  }

  createWorldGUI() {

  }

  public openModal () {
    myComm.increment()
  }

  create () {
    this.loadMap()
  }

  update (delta) {
    for (let worldGameObjectsKey in this.worldGameObjects) {
      ((this.worldGameObjects[worldGameObjectsKey] as unknown) as IGameObject).onUpdate(delta)
    }
  }
}

export default MainScene