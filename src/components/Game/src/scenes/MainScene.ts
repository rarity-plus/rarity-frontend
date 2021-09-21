import RPScene from '../components/RPScene';
import { ArcRotateCamera, Engine, HemisphericLight, Mesh, Scene, Vector3, RecastJSPlugin } from 'babylonjs';
import RPPlayer from '../gameObjects/RPPlayer';

class MainScene extends RPScene {

  light: HemisphericLight;
  public camera: ArcRotateCamera;

  player: RPPlayer
  navigationPlugin: RecastJSPlugin;

  onSceneLoaded(scene: Scene) {
    super.onSceneLoaded(scene);

    try{
      this.navigationPlugin = new RecastJSPlugin();
      this.navigationPlugin.setWorkerURL("workers/navMeshWorker.js")
    }catch (e){
      console.log(e)
    }

    this.camera = new ArcRotateCamera("Camera", 1, 1, 4, Vector3.Zero(), this._scene)

    this.camera.attachControl(this._engine.inputElement, false);

    this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this._scene);

    this.player = new RPPlayer(scene, this.camera)

    let plane = this._scene.getMeshByName("Plane") as Mesh

    // this.navigationPlugin.createNavMesh([plane], {
    //   ch: 0,
    //   cs: 0,
    //   detailSampleDist: 0,
    //   detailSampleMaxError: 0,
    //   maxEdgeLen: 0,
    //   maxSimplificationError: 0,
    //   maxVertsPerPoly: 0,
    //   mergeRegionArea: 0,
    //   minRegionArea: 0,
    //   walkableClimb: 0,
    //   walkableHeight: 0,
    //   walkableRadius: 0,
    //   walkableSlopeAngle: 0
    //
    // })

  }


}

export default MainScene