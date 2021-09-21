import { ArcRotateCamera, Scene, SceneLoader, TransformNode, Vector3 } from 'babylonjs';
import 'babylonjs-loaders';

class RPPlayer extends TransformNode {

    readonly scene: Scene;

    mesh;

    camera: ArcRotateCamera;

    constructor(scene: Scene, camera: ArcRotateCamera) {
      super("RPPlayer", scene);
      this.scene = scene
      this.camera = camera

      SceneLoader.ImportMesh(null, "/assets/models/", "character.glb", this.scene, (meshes) => {
          console.log("Meshes ", meshes)

          this.mesh = meshes[0]

          let spawnPosition = this.scene.getMeshByName("SpawnPoint")
          spawnPosition.visibility = 0;

          this.mesh.position = spawnPosition.position

          this.assetLoaded()
      })

      this.scene.registerBeforeRender(() => {
        this.update()
      })
    }

    assetLoaded() {
      this.camera.lockedTarget = this.mesh

    }

    update() {

    }
}

export default RPPlayer