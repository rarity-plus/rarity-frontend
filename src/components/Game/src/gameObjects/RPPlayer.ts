import { ArcRotateCamera, Mesh, MeshBuilder, Scene, TransformNode, Vector3 } from 'babylonjs';
import RPScene from '../components/RPScene';

class RPPlayer extends TransformNode{

  scene: RPScene;
  camera: ArcRotateCamera;
  mesh: Mesh;

    constructor(scene: RPScene) {
      super("player_transform", scene.instance);
      this.scene = scene;
    }

    init() {
      this.camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), this.scene.instance);
      this.camera.attachControl(this.scene.engineInstance.getRenderingCanvas(), true);


      this.mesh = MeshBuilder.CreateBox("cube", { size: 200, height: 200 }, this.scene.instance);
      this.camera.lockedTarget = this.mesh;
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