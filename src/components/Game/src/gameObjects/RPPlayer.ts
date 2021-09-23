import { ArcRotateCamera, Scene, TransformNode, Vector3 } from 'babylonjs';

class RPPlayer extends TransformNode{

  scene: Scene;
  camera: ArcRotateCamera;

    constructor(scene: Scene) {
      super("player_transform", scene);
      this.scene = scene;

      this.camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), this.scene);
      this.camera.attachControl(this.scene.getEngine().getRenderingCanvas(), true);
    }

    update() {

    }

    // readonly scene: Scene;
    //
    // mesh;
    //
    // camera: ArcRotateCamera;
    //
    // // constructor(scene: Scene, camera: ArcRotateCamera) {
    // //   super("RPPlayer", scene);
    // //   this.scene = scene
    // //   this.camera = camera
    // //
    // //   SceneLoader.ImportMesh(null, "/assets/models/", "character.glb", this.scene, (meshes) => {
    // //       console.log("Meshes ", meshes)
    // //
    // //       this.mesh = meshes[0]
    // //
    // //       let spawnPosition = this.scene.getMeshByName("SpawnPoint")
    // //       spawnPosition.visibility = 0;
    // //
    // //       this.mesh.position = spawnPosition.position
    // //
    // //       this.assetLoaded()
    // //   })
    // //
    // //   this.scene.registerBeforeRender(() => {
    // //     this.update()
    // //   })
    // // }
    //
    // assetLoaded() {
    //   this.camera.lockedTarget = this.mesh
    //
    // }
    //
    // update() {
    //
    // }
}

export default RPPlayer