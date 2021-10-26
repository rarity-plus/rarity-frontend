import { HemisphericLight, Scene, SceneLoader, Vector3, Color3, AssetsManager, Mesh } from 'babylonjs';
import RPScene from '../components/RPScene';
import "babylonjs-loaders"

class RPWorld {

  scene: RPScene;

  staticMeshes: Mesh[];
  worldPoints: Mesh[];
  worldLights;

  constructor(scene: RPScene) {
    this.scene = scene;
  }

  create(worldUrl:string, worldFilename: string, onCreated: (world:RPWorld) => void) {
    //  /assets/scenes/
    //  'world.glb

    SceneLoader.ImportMesh(undefined, worldUrl, worldFilename, this.scene.instance, (meshes,
                                                                                     particles,
                                                                                     skeletons,
                                                                                     animationGroup,
                                                                                     transformNodes) => {
      //
      if(meshes.length <= 0){
        console.error("[WorldSystem]:", "0 meshes to load!")
        return;
      }
      
      let castedMeshArr = meshes as Mesh[]

      //Filter world lights
      this.worldLights = transformNodes.filter((transform) => {
          if(transform.name.startsWith("light") || transform.id.startsWith("light")){
            console.log("light", transform)
            return true;
          }

          return false;
      })

      //Filter static meshes
      this.staticMeshes = castedMeshArr.filter((mesh ) => {
        if(mesh.name.startsWith("static") || mesh.id.startsWith("static")){
          if(mesh.getClassName() === "Mesh"){
            mesh.isPickable = false;
            return true;
          }
        }

        return false;
      })


      //Filter world points
      this.worldPoints = castedMeshArr.filter((mesh) => {
        if(mesh.name.startsWith("point") || mesh.id.startsWith("point")) {
          mesh.visibility = 0;

          return true;
        }

        return false
      })


      console.info("[WorldSystem]:", "World loaded!")

      onCreated(this)
    }, () => {}, (scene,message) => {
        console.error(message)
    })
  }

  getWorldMesh() {
    return this.staticMeshes
  }
}

export default RPWorld