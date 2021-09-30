import { ArcRotateCamera, Mesh, MeshBuilder, Scene, SceneLoader,AnimationGroup, TransformNode, Vector3, AssetsManager } from 'babylonjs';
import RPScene from '../components/RPScene';
import MainScene from '../scenes/MainScene';

class RPPlayer extends TransformNode{

  scene: RPScene;
  mesh: Mesh;
  camera: ArcRotateCamera;
  mainScene: MainScene

  walkAnimationGroup: AnimationGroup;
  idleAnimationGroup: AnimationGroup;

    constructor(scene: RPScene) {
      super("player_transform", scene.instance);
      this.scene = scene;
    }

    init() {
      this.mainScene = this.scene as MainScene

      var assetsManager = new AssetsManager(this.getScene());

      var meshTask = assetsManager.addMeshTask("character_task", "", "/assets/models/", "character.glb");
      //TODO: Use correct naming istead of index
      meshTask.onSuccess =  (task) => {
        this.mesh = task.loadedMeshes[0] as Mesh
        this.mesh.setParent(this)
        this.mesh.checkCollisions = true;

        this.walkAnimationGroup = task.loadedAnimationGroups[1]
        this.idleAnimationGroup = task.loadedAnimationGroups[0]
        console.log(task.loadedAnimationGroups)
        // console.log(this.mesh.getAnimationByName("Armature|mixamo.com|Layer0"))

        this.walkAnimationGroup.stop()
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
            this.idleAnimationGroup.stop()
            this.walkAnimationGroup.start(true, 1)
          }else{
            this.walkAnimationGroup.stop()
            this.idleAnimationGroup.start(true,1)
          }
        }
      }
    }

  
}

export default RPPlayer