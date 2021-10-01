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

      return this.agentsToRegister.push(agent)
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


          console.log("[NavigationSystem]: Generated navmesh data:", navmeshData)
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

              if(agent.onCreate){
                agent.onCreate(this, agentIndex)
              }

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
            if(this.registeredAgents[key].onUpdate){
              this.registeredAgents[key].onUpdate()
            }
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

}

export default NavigationSystem