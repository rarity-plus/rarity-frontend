import {
  RecastJSPlugin,
  ICrowd,
  INavMeshParameters,
  Vector3,
  StandardMaterial,
  Color3,
  Mesh,
  MeshBuilder, TransformNode, IAgentParameters,
} from 'babylonjs';

// @ts-ignore
import Recast from 'recast-detour/recast'

import RPScene from '../components/RPScene';

type AgentType = {
    name: string;
    pos: Vector3;
    transform: TransformNode;
    parameters:  IAgentParameters;

    onCreate: (navigationSystem: NavigationSystem, agentId: number) => void,
    onUpdate: () => void,
}

type RegisteredAgentsType = {
  [key: string]: {
    agentId: number
    onUpdate: () => void
  }
}


//TODO: Refactor
class NavigationSystem {

    private static instance: NavigationSystem;

    navigationPlugin: RecastJSPlugin;
    recastInstance: Recast;
    scene: RPScene;
    navmeshConfig: INavMeshParameters;

    navMeshes: Mesh[] = []

    agentsToRegister: AgentType[] = [];
    registeredAgents: RegisteredAgentsType = {};

    crowdInstance: ICrowd;

    currentNavmeshData: Uint8Array;

    navmeshDebug;
    navmeshDebugMaterial;


    // navMeshOptions: INavMeshParameters = {
    //       cs: 0.22,
    //       ch: 0.01,
    //       walkableSlopeAngle: 90,
    //       walkableHeight: 1.5,
    //       walkableClimb: 2,
    //       walkableRadius: 1,
    //       maxEdgeLen: 12.,
    //       maxSimplificationError: 0,
    //       minRegionArea: 8,
    //       mergeRegionArea: 20,
    //       maxVertsPerPoly: 6,
    //       detailSampleDist: 6,
    //       detailSampleMaxError: 1,
    // }

    private constructor() {}

    public static get() {
        if(!NavigationSystem.instance){
            NavigationSystem.instance = new NavigationSystem()
        }

        return NavigationSystem.instance
    }

    async register(scene: RPScene, navmeshConfig: INavMeshParameters) {
      this.scene = scene
      this.navmeshConfig = navmeshConfig

      await this.init()
    }

    private async init() {
        if(this.isInitialized()){
          console.warn("[NavigationSystem]:", "NavigationSystem already initialized")
          return;
        }

        try{
            console.info("[NavigationSystem]:", "Initializing NavigationSystem")
            this.recastInstance = await Recast()
            this.navigationPlugin = new RecastJSPlugin(this.recastInstance)
            this.navigationPlugin.setWorkerURL("/workers/navMeshWorker.js");
        }catch (e){
            console.error("[NavigationSystem]:", e)
        }
    }

    public registerAgent(agent: AgentType) {
      if(!this.isInitialized()){
        console.warn("[NavigationSystem]:", "Looks like the system isn't initialized , please initialize it before you create a navmesh")
      }

      return this.agentsToRegister.push(agent)

      // let t = this.navigationPlugin.createCrowd(1, 0.1, this.scene.instance);
      // t.addAgent(new Vector3(0,0,0), agentParams, mainScene.player);
    }

    public registerMesh(mesh: Mesh) {
        this.navMeshes.push(mesh)

        console.info("[NavigationSystem]:", "Mesh registered!")
    }

    public isInitialized() : boolean {
      return !!(this.recastInstance && this.navigationPlugin);
    }

    public async createNavmesh() {
      if(!this.isInitialized()){
        console.error("[NavigationSystem]:", "NavigationSystem isn't registered!");
        return;
      }

      if(this.navMeshes.length <= 0){
        console.error("[NavigationSystem]:", "Can't generate navmesh without a mesh!");
        return;
      }

      this.navigationPlugin.createNavMesh(this.navMeshes, this.navmeshConfig, (navmeshData ) => {
          if(navmeshData.length <= 0){
            console.error("[NavigationSystem]:", "Couldn't generate navmesh!")
            return;
          }


          console.log("[NavigationSystem]:", "Generated navmesh data: " + navmeshData)
          this.currentNavmeshData = navmeshData

          try {
            //Build the navmesh data
            this.navigationPlugin.buildFromNavmeshData(this.currentNavmeshData)
          }catch (e){
            console.error("[NavigationSystem]:", e)
          }

          this.createDebugMaterial()

          if(this.agentsToRegister.length > 0) {
            this.crowdInstance = this.navigationPlugin.createCrowd(this.agentsToRegister.length, 0.1, this.scene.instance)

            this.agentsToRegister.forEach((agent, index) => {
              let agentIndex = this.crowdInstance.addAgent(agent.pos, agent.parameters, agent.transform)

              this.registeredAgents[agent.name] = {
                agentId: agentIndex,
                onUpdate: agent.onUpdate
              }

              agent.onCreate(this, agentIndex)
            })
          }else{
            console.warn("[NavigationSystem]:", "0 agents to generate.")
          }

      })
    }

    public update() {
      this.isInitialized() && (() => {
        if(!this.registeredAgents){
          return;
        }

        if(Object.keys(this.registeredAgents).length > 0){
          Object.keys(this.registeredAgents).forEach((key) => {
            this.registeredAgents[key].onUpdate()
          })
        }
      })()
    }

    private createDebugMaterial() {
        this.navmeshDebug = this.navigationPlugin.createDebugNavMesh(this.scene.instance)
        this.navmeshDebug.position = new Vector3(0, 0.01, 0)

        this.navmeshDebugMaterial = new StandardMaterial("navmesh_debug_material", this.scene.instance)
        this.navmeshDebugMaterial.diffuseColor = new Color3(0.5, 0.5 ,1)
        this.navmeshDebugMaterial.alpha = 0.3
        this.navmeshDebug.material = this.navmeshDebugMaterial

    }

    // createNavmesh() {
    //     if(!this.navigationPlugin){
    //         return;
    //     }
    //
    //     let mainScene = this.scene as MainScene
    //
    //     this.navigationPlugin.createNavMesh([mainScene.world.mesh], this.navMeshOptions, (navmeshData) => {
    //         console.log("Got worker data:", navmeshData)
    //
    //         this.navmeshData = navmeshData
    //
    //         this.navigationPlugin.buildFromNavmeshData(navmeshData);
    //
    //         let navmeshdebug = this.navigationPlugin.createDebugNavMesh(this.scene.instance);
    //         navmeshdebug.position = new Vector3(0, 0.01, 0);
    //
    //         let matdebug = new StandardMaterial('matdebug', this.scene.instance);
    //         matdebug.diffuseColor = new Color3(0.5, 0.2, 1);
    //         matdebug.alpha = 0.5;
    //         navmeshdebug.material = matdebug;
    //
    //         this.crowdInstance = this.navigationPlugin.createCrowd(1, 0.1, this.scene.instance);
    //         try {
    //           this.navmeshCreated()
    //         }catch (e){
    //           console.error(e)
    //         }
    //     })
    // }
    //
    // navmeshCreated() {
    //     if(!this.navigationPlugin){
    //       return;
    //     }
    //
    //     var agentParams = {
    //             radius: 0.1,
    //             height: 0.2,
    //             maxAcceleration: 10,
    //             maxSpeed: 2,
    //             collisionQueryRange: 0.5,
    //             pathOptimizationRange: 0.0,
    //             separationWeight: 1.0
    //     };
    //
    //     let mainScene = this.scene as MainScene
    //
    //     var agentIndex = this.crowdInstance.addAgent(new Vector3(0,0,0), agentParams, mainScene.player);
    //
    //     this.agents.push({idx:agentIndex, trf:mainScene.player});
    //
    //     let pathLine;
    //
    //     const pointerDown = (mesh) => {
    //         const getGroundPosition = () => {
    //            let pickInfo = this.scene.instance.pick(this.scene.instance.pointerX, this.scene.instance.pointerY);
    //            if (pickInfo.hit) {
    //                   return pickInfo.pickedPoint;
    //            }
    //            return null;
    //         }
    //
    //         let startingPoint = getGroundPosition();
    //         if (startingPoint) {
    //
    //               var agents = this.crowdInstance.getAgents();
    //               var i;
    //               for (i=0;i<agents.length;i++) {
    //
    //                 this.crowdInstance.agentGoto(agents[i], this.navigationPlugin.getClosestPoint(startingPoint));
    //               }
    //
    //               var pathPoints = this.navigationPlugin.computePath( this.crowdInstance.getAgentPosition(agents[0]), this.navigationPlugin.getClosestPoint(startingPoint));
    //
    //               pathLine = MeshBuilder.CreateDashedLines("ribbon", {points: pathPoints, updatable: true, instance: pathLine}, this.scene.instance);
    //         }
    //     }
    //
    //     //TODO: Stop using switch
    //     this.scene.instance.onPointerObservable.add((pointerInfo) => {
    //         switch (pointerInfo.type) {
    //                 case BABYLON.PointerEventTypes.POINTERDOWN:
    //                   if((pointerInfo.event as any).which === 1 && pointerInfo.pickInfo.hit) {
    //                     pointerDown(pointerInfo.pickInfo.pickedMesh)
    //                   }
    //                   break;
    //         }
    //     })
    // }


    // //TODO: Make it more stable
    // update() {
    //     if(this.agents.length > 0){
    //         var agentCount = this.agents.length;
    //         for(let i = 0;i<agentCount;i++)
    //         {
    //           var ag = this.agents[i];
    //           // ag.trf.position = this.crowdInstance.getAgentPosition(ag.idx);
    //           //
    //
    //           let vel = this.crowdInstance.getAgentVelocity(ag.idx);
    //           // this.crowdInstance.getAgentNextTargetPathToRef(ag.idx, ag.trf.position);
    //
    //           var desiredRotation = Math.atan2(vel.x, vel.z);
    //           ag.trf.rotation.y = ag.trf.rotation.y + (desiredRotation - ag.trf.rotation.y) * 0.05;
    //
    //           // if (vel.length() > 0.2)
    //           //  {
    //           //
    //           //       var desiredRotation = Math.atan2(vel.x, vel.z);
    //           //       ag.trf.rotation.y = ag.trf.rotation.y + (desiredRotation - ag.trf.rotation.y) * 0.05;
    //           //  }
    //         }
    //     }
    // }
}

export default NavigationSystem