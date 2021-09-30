import { HemisphericLight, Scene, SceneLoader, Vector3, Color3, AssetsManager, Mesh } from 'babylonjs';
import RPScene from '../components/RPScene';

import "babylonjs-loaders"
import NavigationSystem from '../systems/NavigationSystem';

class RPWorld {

  scene: RPScene;

  mesh: Mesh;

  loadedMeshes;

  constructor(scene: RPScene) {
    this.scene = scene;
  }

  init() {

    SceneLoader.ImportMesh(undefined,'/assets/scenes/', 'world.babylon', this.scene.instance, (meshes, particleSystems, skeletons) => {
      // console.log(meshes)

      let meshesToMerge = meshes.filter((mesh) => mesh.name.startsWith("static")) as Mesh[]

      try {
        this.mesh = Mesh.MergeMeshes(meshesToMerge, true, true, undefined, true, true)

        NavigationSystem.get().registerMesh(this.mesh)
      }catch (e){
        console.error(e)
      }

      var light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene.instance);
      light.intensity = 0.6;
      light.specular = Color3.Black();
    }, () => {}, (scene,err) => {
      console.error(err)
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

}

export default RPWorld