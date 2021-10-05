import { HemisphericLight, Scene, SceneLoader, Vector3, Color3, AssetsManager, Mesh } from 'babylonjs';
import RPScene from '../components/RPScene';

import "babylonjs-loaders"
import NavigationSystem from '../systems/NavigationSystem';

class RPWorld {

  scene: RPScene;

  staticMeshes: Mesh[];
  worldPoints: Mesh[];

  constructor(scene: RPScene) {
    this.scene = scene;
  }

  createWorld(onCreated: (world:RPWorld) => void) {
    SceneLoader.ImportMesh(undefined, '/assets/scenes/', 'world.babylon', this.scene.instance, (meshes) => {
      if(meshes.length <= 0){
        console.error("[WorldSystem]:", "0 meshes to load!")
        return;
      }

      let castedMeshArr = meshes as Mesh[]

      //Filter static meshes
      this.staticMeshes = castedMeshArr.filter((mesh ) => {
        return mesh.name.startsWith("static") || mesh.id.startsWith("static")
      })

      //Filter world points
      this.worldPoints = castedMeshArr.filter((mesh) => {
        return mesh.name.startsWith("point") || mesh.id.startsWith("point")
      })

      console.info("[WorldSystem]:", "World loaded!")

      onCreated(this)
    }, () => {}, (scene,message) => {
        console.error(message)
    })
  }

  getWorldMesh() {
    return Mesh.MergeMeshes(this.staticMeshes, true, true, undefined, true,true)
  }
}

export default RPWorld