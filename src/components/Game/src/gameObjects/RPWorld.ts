import { HemisphericLight, Scene, SceneLoader, Vector3, Color3, AssetsManager, Mesh } from 'babylonjs';
import RPScene from '../components/RPScene';

import "babylonjs-loaders"

class RPWorld {

  scene: RPScene;

  mesh: Mesh;

  loadedMeshes;

  constructor(scene: RPScene) {
    this.scene = scene;
  }

  init() {

    SceneLoader.ImportMesh('','/assets/scenes/', 'world.babylon', this.scene.instance, (meshes, particleSystems, skeletons) => {
      this.mesh = Mesh.MergeMeshes(meshes as Mesh[], true, true, undefined, false, true)

      var light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene.instance);
      light.intensity = 0.6;
      light.specular = Color3.Black();
    })

    // var assetsManager = new AssetsManager(this.scene.instance);
    //
    // var world_task = assetsManager.addMeshTask("world_task", "", "/assets/scenes/", "world.babylon");
    //
    // world_task.onSuccess =  (task) => {
    //   this.mesh = task.loadedMeshes[1] as Mesh
    //
    //   // this.loadedMeshes = Mesh.MergeMeshes([task.loadedMeshes[1] as Mesh, task.loadedMeshes[2] as Mesh])
    //
    //   this.mesh.checkCollisions = true;
    //
    //   var light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene.instance);
    //   light.intensity = 0.6;
    //   light.specular = Color3.Black();
    // }
    //
    //
    // assetsManager.load()


  }

  getMergedMesh() {
    console.log( this.loadedMeshes)
    return  this.mesh
  }
}

export default RPWorld