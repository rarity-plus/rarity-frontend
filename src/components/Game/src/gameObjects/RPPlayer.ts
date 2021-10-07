import { ArcRotateCamera, Mesh, MeshBuilder, Scene, SceneLoader,AnimationGroup, TransformNode, Vector3, AssetsManager } from 'babylonjs';
import RPScene from '../components/RPScene';
import MainScene from '../scenes/MainScene';
import NavigationSystem from '../systems/NavigationSystem';
import { PlanePanel, TextBlock } from 'babylonjs-gui';
import RPWorld from './RPWorld';

class RPPlayer extends TransformNode{

  scene: RPScene;
  mesh: Mesh;
  camera: ArcRotateCamera;
  mainScene: MainScene

  walkAnimationGroup: AnimationGroup;
  idleAnimationGroup: AnimationGroup;

  agentId: number;

  worldRef: RPWorld;

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

        console.log(task.loadedAnimationGroups)

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

      NavigationSystem.get().registerAgent({
        name: "player",

        onCreate: (navigationSystem, agentId) => this.onAgentCreate(navigationSystem, agentId),

        onUpdate: () => {},

        parameters: { radius: 0.1,
                      height: 0.2,
                      maxAcceleration: 10,
                      maxSpeed: 2,
                      collisionQueryRange: 0.5,
                      pathOptimizationRange: 0.0,
                      separationWeight: 1.0 },
        pos: new Vector3(0,0,0),
        transform: this
      })


    }


    setWorld(world) {
     this.worldRef = world;
    }

    onAgentCreate(navigationSystem: NavigationSystem, agentId: number): void {

      let pathLine;

      this.agentId = agentId


      let spawnPoint = this.worldRef.worldPoints.find((mesh) => mesh.name === "point_spawn");


      NavigationSystem.get().crowdInstance.agentTeleport(this.agentId, new Vector3( spawnPoint.absolutePosition.x, 0.01,  spawnPoint.absolutePosition.z))

      const pointerDown = (mesh) => {
        const getGroundPosition = () => {
          let pickInfo = this.scene.instance.pick(this.scene.instance.pointerX, this.scene.instance.pointerY);
          if (pickInfo.hit) {
             return pickInfo.pickedPoint;
          }
          return null;
        }

        let endPosition = getGroundPosition();

        if(endPosition){
          let navigationSystemRef = NavigationSystem.get()
          let crowdInstanceRef = navigationSystemRef.crowdInstance

          crowdInstanceRef.agentGoto(agentId, navigationSystemRef.navigationPlugin.getClosestPoint(endPosition))

          let pathPoints = navigationSystemRef.navigationPlugin.computePath(crowdInstanceRef.getAgentPosition(agentId),
              navigationSystemRef.navigationPlugin.getClosestPoint(endPosition)
          )

          pathLine = MeshBuilder.CreateDashedLines("nav_line", {points: pathPoints, updatable: true, instance: pathLine}, this.scene.instance)
        }
      }

      this.scene.instance.onPointerObservable.add((pointerInfo) => {
                switch (pointerInfo.type) {
                        case BABYLON.PointerEventTypes.POINTERDOWN:
                          if((pointerInfo.event as any).which === 1 && pointerInfo.pickInfo.hit) {
                            pointerDown(pointerInfo.pickInfo.pickedMesh)
                          }
                          break;
                }
      })
    }


  update() {
      if(this.mainScene){
        let navigationSystemRef = NavigationSystem.get()

        if(navigationSystemRef && this.agentId != null){

          let crowdInstance = navigationSystemRef.crowdInstance

          let vel = crowdInstance.getAgentVelocity(this.agentId);

          if(vel.length() > 0){
            let desiredRotation = Math.atan2(vel.x, vel.z);
            this.rotation.y = this.rotation.y + (desiredRotation - this.rotation.y) * 0.05;
            
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