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


    this.camera = new ArcRotateCamera("Camera", 1, 1, 4, Vector3.Zero(), this._scene)

    this.camera.attachControl(this._engine.inputElement, false);

    this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this._scene);

    this.player = new RPPlayer(scene, this.camera)

    let plane = this._scene.getMeshByName("Plane") as Mesh
    

  }


}

export default MainScene