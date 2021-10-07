import RPScene from '../components/RPScene';
import RPPlayer from '../gameObjects/RPPlayer';
import { Engine, ArcRotateCamera,AbstractMesh, Mesh , Vector3, HemisphericLight, MeshBuilder, RecastJSPlugin, Color3, StandardMaterial, TransformNode } from 'babylonjs';

import NavigationSystem from '../systems/NavigationSystem';
import RPWorld from '../gameObjects/RPWorld';
import NPCManager from '../systems/NPCManager';
import AdventureNPC from '../gameObjects/AdventureNPC';

//Execution LOOP:
// Create World (Merge Meshes, Sort Meshes, Create LIGHTS) -> Register Mesh
class MainScene extends RPScene {

  player: RPPlayer;
  world: RPWorld;

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
    }])

    this.world.createWorld((world) => {
      let light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.instance);
          light.intensity = 0.9;
          light.specular = Color3.Black();

      world.getWorldMesh().forEach((mesh) => {
        NavigationSystem.get().registerMesh(mesh)
      })

      // NavigationSystem.get().registerMesh(world.getWorldMesh());

      this.player.setWorld(world);


      (async () => {
        await NavigationSystem.get().register(this, {
          cs: 0.22,
          ch: 0.01,
          walkableSlopeAngle: 90,
          walkableHeight: 1.5,
          walkableClimb: 2,
          walkableRadius: 1,
          maxEdgeLen: 12.,
          maxSimplificationError: 0,
          minRegionArea: 8,
          mergeRegionArea: 20,
          maxVertsPerPoly: 6,
          detailSampleDist: 6,
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

    //Call player update loop
    this.player && this.player.update()
  }

  async create() {

  }


}


export default MainScene