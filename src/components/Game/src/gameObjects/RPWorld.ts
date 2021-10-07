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
    SceneLoader.ImportMesh(undefined, '/assets/scenes/', 'world.glb', this.scene.instance, (meshes) => {
      if(meshes.length <= 0){
        console.error("[WorldSystem]:", "0 meshes to load!")
        return;
      }
      
      let castedMeshArr = meshes as Mesh[]

      //Filter static meshes
      this.staticMeshes = castedMeshArr.filter((mesh ) => {
        if(mesh.name.startsWith("static") || mesh.id.startsWith("static")){
          if(mesh.getClassName() === "Mesh")
            return true;

          return false;
        }

        return false;
      })

      console.log(this.staticMeshes)


      //Filter world points
      this.worldPoints = castedMeshArr.filter((mesh) => {
        return mesh.name.startsWith("point") || mesh.id.startsWith("point")
      })

      this.worldPoints.forEach((mesh) => {
        mesh.visibility = 0;
      })

      console.info("[WorldSystem]:", "World loaded!")

      onCreated(this)
    }, () => {}, (scene,message) => {
        console.error(message)
    })
  }

  getWorldMesh() {
    return this.staticMeshes

    // try {
    //   return Mesh.MergeMeshes(this.staticMeshes, true, true, undefined, false,true)
    // }catch(e){
    //   console.error("[WorldSystem]:", e)
    // }
  }
}

export default RPWorld