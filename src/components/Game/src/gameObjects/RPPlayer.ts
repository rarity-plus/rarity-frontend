import { ArcRotateCamera, Mesh, MeshBuilder, Scene, SceneLoader, TransformNode, Vector3, AssetsManager } from 'babylonjs';
import RPScene from '../components/RPScene';

class RPPlayer extends TransformNode{

  scene: RPScene;
  mesh: Mesh;
  camera: ArcRotateCamera;

    constructor(scene: RPScene) {
      super("player_transform", scene.instance);
      this.scene = scene;
    }

    init() {

      var assetsManager = new AssetsManager(this.getScene());

      var meshTask = assetsManager.addMeshTask("character_task", "", "/assets/models/", "character.glb");

      meshTask.onSuccess =  (task) => {
        this.mesh = task.loadedMeshes[0] as Mesh
        this.mesh.setParent(this)

        
      }

      assetsManager.load()

      this.camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 50, this.position, this.getScene());
      this.camera.attachControl(this.getEngine().getRenderingCanvas(), true);
      this.camera.lowerRadiusLimit = 10;
      this.camera.upperRadiusLimit = 100;

      this.camera.upperBetaLimit = 1;

      this.camera.lockedTarget = this.position;
      this.camera.alpha += Math.PI;
    }

    async asyncInit() {

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