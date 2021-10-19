import RPScene from '../components/RPScene';
import RPPlayer from '../gameObjects/RPPlayer';
import { Engine, ArcRotateCamera,AbstractMesh, Mesh , Vector3, HemisphericLight, MeshBuilder, RecastJSPlugin, Color3, StandardMaterial, TransformNode } from 'babylonjs';

import NavigationSystem from '../systems/NavigationSystem';
import RPWorld from '../gameObjects/RPWorld';
import NPCManager from '../systems/NPCManager';
import AdventureNPC from '../gameObjects/AdventureNPC';
import AdventureBookNPC from '../gameObjects/AdventureBookNPC';
import { AdvancedDynamicTexture } from 'babylonjs-gui';


class MainScene extends RPScene {

  player: RPPlayer;
  world: RPWorld;
  guiTexture;
  camera: ArcRotateCamera;

  constructor(engine: Engine) {
    super(engine);

    this.world = new RPWorld(this)
    this.player = new RPPlayer(this)
  }

  async asyncCreate() {


    this.player.init()

    NPCManager.get().register(this)

    NPCManager.get().registerNPCs([{
      name: "adventure_npc",
      classType: AdventureNPC
    }, {
      name: "bookstand_npc",
      classType: AdventureBookNPC
    }])

    this.world.create("/assets/scenes/","world.glb", (world) => {
      let light = new HemisphericLight("light1", new Vector3(3, 6, 3), this.instance);
          light.intensity = .7;
          light.specular = Color3.Black();


      world.getWorldMesh().forEach((mesh) => {
        NavigationSystem.get().registerMesh(mesh)
      })

      // NavigationSystem.get().registerMesh(world.getWorldMesh());

      this.player.setWorld(world);


      (async () => {
        await NavigationSystem.get().register(this, {
          cs: 0.34,
          ch: 0.02,
          walkableSlopeAngle: 90,
          walkableHeight: 0.5,
          walkableClimb: 2,
          walkableRadius: 1,
          maxEdgeLen: 2,
          maxSimplificationError: 0.05,
          minRegionArea: 1,
          mergeRegionArea: 10,
          maxVertsPerPoly: 3,
          detailSampleDist: 3,
          detailSampleMaxError: 1,
        })

        await NavigationSystem.get().createNavmesh()

        await NPCManager.get().createNPCs();
      })()

    })

  }


  update() {
    //Call the navigation system update loop
    NavigationSystem.get().update()

    NPCManager.get().update()

    //Call player update loop
    this.player && this.player.update()
  }

  async create() {

  }


}


export default MainScene