import RPScene from '../components/RPScene';
import RPPlayer from '../gameObjects/RPPlayer';
import { Engine, ArcRotateCamera,AbstractMesh, Mesh , Vector3, HemisphericLight, MeshBuilder, RecastJSPlugin, Color3, StandardMaterial, TransformNode } from 'babylonjs';

// @ts-ignore
import Recast from 'recast-detour/recast'

class MainScene extends RPScene {

  navigationPlugin: RecastJSPlugin;

  agents = []

  player: RPPlayer;

  constructor(engine: Engine) {
    super(engine);

    this.player = new RPPlayer(this.scene)
  }

  async asyncCreate() {

  }

  async create() {
    // this.camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), this.scene);
    // this.camera.attachControl(this.engine.getRenderingCanvas(), true);
    //
    // let camera = this.camera
    // this.testNumber += 1;
    //
    // this.cameraZ = this.camera
    //
    // const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
    //
    // const box = MeshBuilder.CreateBox("box", {}, this.scene);
    //
    // try{
    //   const recast = await Recast()
    //
    //   this.navigationPlugin = new RecastJSPlugin(recast);
    //   this.navigationPlugin.setWorkerURL("/workers/navMeshWorker.js");
    // }catch (e){
    //   console.log(e)
    // }
    //
    // function createStaticMesh(scene) {
    //   var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);
    //
    //   // Materials
    //   var mat1 = new StandardMaterial('mat1', scene);
    //   mat1.diffuseColor = new Color3(1, 1, 1);
    //
    //   var sphere = MeshBuilder.CreateSphere("sphere1", {diameter: 2, segments: 16}, scene);
    //   sphere.material = mat1;
    //   sphere.position.y = 1;
    //
    //   var cube = MeshBuilder.CreateBox("cube", { size: 1, height: 3 }, scene);
    //   cube.position = new Vector3(1, 1.5, 0);
    //   //cube.material = mat2;
    //
    //   var mesh = Mesh.MergeMeshes([sphere, cube, ground]);
    //   return mesh;
    // }
    //
    // this.staticMeshes = createStaticMesh(this.scene)
    //
    // var navmeshParameters = {
    //   cs: 0.2,
    //   ch: 0.2,
    //   walkableSlopeAngle: 90,
    //   walkableHeight: 1.0,
    //   walkableClimb: 1,
    //   walkableRadius: 1,
    //   maxEdgeLen: 12.,
    //   maxSimplificationError: 1.3,
    //   minRegionArea: 8,
    //   mergeRegionArea: 20,
    //   maxVertsPerPoly: 6,
    //   detailSampleDist: 6,
    //   detailSampleMaxError: 1,
    // };
    //
    //
    // var transform = new TransformNode("transform");
    // if(camera)
    //   camera.lockedTarget = transform;
    //
    // console.log(this.testNumber)

    // this.navigationPlugin.createNavMesh([this.staticMeshes], navmeshParameters, (navmeshData) => {
    //   console.log("got worker data", navmeshData);
    //   this.navigationPlugin.buildFromNavmeshData(navmeshData);
    //   var navmeshdebug = this.navigationPlugin.createDebugNavMesh(this.scene);
    //   navmeshdebug.position = new Vector3(0, 0.01, 0);
    //
    //   var matdebug = new StandardMaterial('matdebug', this.scene);
    //   matdebug.diffuseColor = new Color3(0.1, 0.2, 1);
    //   matdebug.alpha = 0.2;
    //   navmeshdebug.material = matdebug;
    //
    //   // crowd
    //   var crowd = this.navigationPlugin.createCrowd(10, 0.1, this.scene);
    //   var i;
    //   var agentParams = {
    //     radius: 0.1,
    //     height: 0.2,
    //     maxAcceleration: 4.0,
    //     maxSpeed: 1.0,
    //     collisionQueryRange: 0.5,
    //     pathOptimizationRange: 0.0,
    //     separationWeight: 1.0};
    //
    //   for (i = 0; i <1; i++) {
    //     var width = 0.20;
    //
    //
    //
    //     var agentCube = MeshBuilder.CreateBox("cube", { size: width, height: width }, this.scene);
    //
    //     var targetCube = MeshBuilder.CreateBox("cube", { size: 0.1, height: 0.1 }, this.scene);
    //     var matAgent = new StandardMaterial('mat2', this.scene);
    //     var variation = Math.random();
    //     matAgent.diffuseColor = new BABYLON.Color3(0.4 + variation * 0.6, 0.3, 1.0 - variation * 0.3);
    //
    //     agentCube.material = matAgent;
    //
    //     var randomPos = this.navigationPlugin.getRandomPointAround(new Vector3(-2.0, 0.1, -1.8), 0.5);
    //
    //     //agentCube.parent = transform;
    //     var agentIndex = crowd.addAgent(randomPos, agentParams, transform);
    //     this.agents.push({idx:agentIndex, trf:transform, mesh:agentCube, target:targetCube});
    //   }
    //
    //   var startingPoint;
    //   var currentMesh;
    //   var pathLine;
    //   var getGroundPosition = () => {
    //     var pickinfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
    //     if (pickinfo.hit) {
    //       return pickinfo.pickedPoint;
    //     }
    //
    //     return null;
    //   }
    //
    //   var pointerDown = (mesh) => {
    //     currentMesh = mesh;
    //     startingPoint = getGroundPosition();
    //     if (startingPoint) { // we need to disconnect camera from canvas
    //
    //       var agents = crowd.getAgents();
    //       var i;
    //       for (i=0;i<agents.length;i++) {
    //         var randomPos = this.navigationPlugin.getRandomPointAround(startingPoint, 1.0);
    //         crowd.agentGoto(agents[i], this.navigationPlugin.getClosestPoint(startingPoint));
    //       }
    //       var pathPoints = this.navigationPlugin.computePath(crowd.getAgentPosition(agents[0]), this.navigationPlugin.getClosestPoint(startingPoint));
    //       pathLine = MeshBuilder.CreateDashedLines("ribbon", {points: pathPoints, updatable: true, instance: pathLine}, this.scene);
    //     }
    //   }
    //
    //   this.scene.onPointerObservable.add((pointerInfo) => {
    //     switch (pointerInfo.type) {
    //       case BABYLON.PointerEventTypes.POINTERDOWN:
    //         if(pointerInfo.pickInfo.hit) {
    //           pointerDown(pointerInfo.pickInfo.pickedMesh)
    //         }
    //         break;
    //     }
    //   });
    //
    //   this.scene.onBeforeRenderObservable.add(()=> {
    //     var agentCount = this.agents.length;
    //     for(let i = 0;i<agentCount;i++)
    //     {
    //       var ag = this.agents[i];
    //       ag.mesh.position = crowd.getAgentPosition(ag.idx);
    //       let vel = crowd.getAgentVelocity(ag.idx);
    //       crowd.getAgentNextTargetPathToRef(ag.idx, ag.target.position);
    //       if (vel.length() > 0.2)
    //       {
    //         vel.normalize();
    //         var desiredRotation = Math.atan2(vel.x, vel.z);
    //         ag.mesh.rotation.y = ag.mesh.rotation.y + (desiredRotation - ag.mesh.rotation.y) * 0.05;
    //       }
    //     }
    // //   });
    // })
  }



  update() {

      //Call player update loop
      this.player && this.player.update()
  }

}


export default MainScene