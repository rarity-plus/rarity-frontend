import RPScene from '../components/RPScene';
import { ArcRotateCamera, Engine, HemisphericLight, Mesh, Scene, Vector3 } from 'babylonjs';



class MainScene extends RPScene {

  light: HemisphericLight;
  camera: ArcRotateCamera;

  onSceneLoaded(scene: Scene) {
    super.onSceneLoaded(scene);

    this.camera = new ArcRotateCamera("Camera", 1, 1, 4, Vector3.Zero(), this._scene)

    this.camera.attachControl(this._engine.inputElement, false);

    this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this._scene);

    var sphere = Mesh.CreateSphere('sphere1', 16, 2, this._scene, false, BABYLON.Mesh.FRONTSIDE)
  }
}

export default MainScene