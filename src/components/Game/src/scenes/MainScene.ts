import RPScene from '../components/RPScene';
import RPPlayer from '../gameObjects/RPPlayer';
import { Engine, ArcRotateCamera,AbstractMesh, Mesh , Vector3, HemisphericLight, MeshBuilder, RecastJSPlugin, Color3, StandardMaterial, TransformNode } from 'babylonjs';

import NavigationSystem from '../systems/NavigationSystem';
import RPWorld from '../gameObjects/RPWorld';
import AdventureNPC from '../gameObjects/AdventureNPC';
import WorldGUISystem from '../systems/WorldGUISystem';

class MainScene extends RPScene {

  player: RPPlayer;
  world: RPWorld;

  camera: ArcRotateCamera;

  adventureNPC: AdventureNPC;

  constructor(engine: Engine) {
    super(engine);

    this.world = new RPWorld(this)
    this.player = new RPPlayer(this)
    // this.navigationSystem = new NavigationSytem(this)

    // this.adventureNPC = new AdventureNPC("adventure_npc", this)

  }

  async asyncCreate() {
    // this.world.init()

    this.player.init()

    this.world.createWorld((world) => {
      let light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.instance);
          light.intensity = 0.6;
          light.specular = Color3.Black();

      NavigationSystem.get().registerMesh(world.getWorldMesh());

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