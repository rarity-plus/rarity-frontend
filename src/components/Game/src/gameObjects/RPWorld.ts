import { HemisphericLight, Scene, SceneLoader, Vector3, Color3, AssetsManager, Mesh } from 'babylonjs';
import RPScene from '../components/RPScene';

import "babylonjs-loaders"

class RPWorld {

  scene: RPScene;

  mesh: Mesh;


  constructor(scene: RPScene) {
    this.scene = scene;
  }

  init() {
    var assetsManager = new AssetsManager(this.scene.instance);

    var world_task = assetsManager.addMeshTask("world_task", "", "/assets/scenes/", "world.glb");

    world_task.onSuccess =  (task) => {
      this.mesh = task.loadedMeshes[1] as Mesh

      var light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene.instance);
      light.intensity = 0.6;
      light.specular = Color3.Black();
    }

    assetsManager.load()

  }

}

export default RPWorld