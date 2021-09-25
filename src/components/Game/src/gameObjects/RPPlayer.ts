import { ArcRotateCamera, Mesh, MeshBuilder, Scene, SceneLoader, TransformNode, Vector3, AssetsManager } from 'babylonjs';
import RPScene from '../components/RPScene';
import MainScene from '../scenes/MainScene';

class RPPlayer extends TransformNode{

  scene: RPScene;
  mesh: Mesh;
  camera: ArcRotateCamera;
  mainScene: MainScene

    constructor(scene: RPScene) {
      super("player_transform", scene.instance);
      this.scene = scene;
    }

    init() {
      this.mainScene = this.scene as MainScene

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

      this.camera.lockedTarget = this;
      this.camera.alpha += Math.PI;
    }

    async asyncInit() {

    }

    update() {
      if(this.mainScene){
        let navigationSystemInstance = this.mainScene.navigationSystem

        if(navigationSystemInstance && this.mainScene.navigationSystem.agents.length > 0){
          let crowdInstance = this.mainScene.navigationSystem.crowdInstance

          let vel = crowdInstance.getAgentVelocity(0);

          if(vel.length() > 0){
            console.log("Moving")
          }
        }
      }
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