import { HemisphericLight, Scene, SceneLoader, Vector3, Color3 } from 'babylonjs';
import RPScene from '../components/RPScene';

import "babylonjs-loaders"

class RPWorld {

  scene: RPScene;

  worldMesh;


  constructor(scene: RPScene) {
    this.scene = scene;
  }

  init() {
    SceneLoader.Append("/assets/scenes/", "world.glb", this.scene.instance, (scene) => {
        this.worldMesh = scene.getMeshById("__root__")

        this.worldMesh.id = "world_mesh"

        var light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene.instance);
        light.intensity = 0.6;
        light.specular = Color3.Black();
    })
  }

}

export default RPWorld