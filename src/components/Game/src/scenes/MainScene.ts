import RPScene from '../components/RPScene';
import RPPlayer from '../gameObjects/RPPlayer';
import { Engine, ArcRotateCamera,AbstractMesh, Mesh , Vector3, HemisphericLight, MeshBuilder, RecastJSPlugin, Color3, StandardMaterial, TransformNode } from 'babylonjs';

// @ts-ignore
import Recast from 'recast-detour/recast'
import NavigationSytem from '../systems/NavigationSytem';
import RPWorld from '../gameObjects/RPWorld';
import AdventureNPC from '../gameObjects/AdventureNPC';

class MainScene extends RPScene {

  agents = []

  player: RPPlayer;
  world: RPWorld;

  camera: ArcRotateCamera;

  adventureNPC: AdventureNPC;

  constructor(engine: Engine) {
    super(engine);

    this.world = new RPWorld(this)
    this.player = new RPPlayer(this)
    // this.navigationSystem = new NavigationSytem(this)

    this.adventureNPC = new AdventureNPC("adventure_npc", this)


  }

  async asyncCreate() {
    NavigationSytem.get().register(this, {
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

    this.world.init()
    this.player.init()
    this.adventureNPC.init()
    // await this.navigationSystem.init()
  }


  update() {
    // //Call the navigation system update loop
    // this.navigationSystem && this.navigationSystem.update()

    //Call player update loop
    this.player && this.player.update()
  }

  async create() {

  }


}


export default MainScene