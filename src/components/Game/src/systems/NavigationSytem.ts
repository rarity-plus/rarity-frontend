import {
    RecastJSPlugin,
    ICrowd,
    INavMeshParameters,
    Vector3,
    StandardMaterial,
    Color3,
    Mesh,
    MeshBuilder,
} from 'babylonjs';

// @ts-ignore
import Recast from 'recast-detour/recast'
import RPScene from '../components/RPScene';
import MainScene from '../scenes/MainScene';


//TODO: Refactor
class NavigationSytem {

    navigationPlugin: RecastJSPlugin;
    recastInstance: Recast;
    scene: RPScene;

    agents = []
    crowdInstance: ICrowd;

    navMeshOptions: INavMeshParameters = {
          cs: 0.22,
          ch: 0.01,
          walkableSlopeAngle: 90,
          walkableHeight: 1.5,
          walkableClimb: 2,
          walkableRadius: 1,
          maxEdgeLen: 12.,
          maxSimplificationError: 0,
          minRegionArea: 8,
          mergeRegionArea: 20,
          maxVertsPerPoly: 6,
          detailSampleDist: 6,
          detailSampleMaxError: 1,
    }

    navmeshData: Uint8Array;

    constructor(scene: RPScene) {
        this.scene = scene;

    }

    async init() {
        try{
            this.recastInstance = await Recast()
            this.navigationPlugin = new RecastJSPlugin(this.recastInstance)
            this.navigationPlugin.setWorkerURL("/workers/navMeshWorker.js");

            this.createNavmesh()
            console.log("Navigation system loaded")
        }catch (e){
            console.error(e)
        }
    }

    createNavmesh() {
        if(!this.navigationPlugin){
            return;
        }

        let mainScene = this.scene as MainScene

        console.log(mainScene.world.getMergedMesh())

        this.navigationPlugin.createNavMesh([mainScene.world.getMergedMesh()], this.navMeshOptions, (navmeshData) => {
            console.log("Got worker data:", navmeshData)

            this.navmeshData = navmeshData

            this.navigationPlugin.buildFromNavmeshData(navmeshData);

            let navmeshdebug = this.navigationPlugin.createDebugNavMesh(this.scene.instance);
            navmeshdebug.position = new Vector3(0, 0.01, 0);

            let matdebug = new StandardMaterial('matdebug', this.scene.instance);
            matdebug.diffuseColor = new Color3(0.5, 0.2, 1);
            matdebug.alpha = 0.5;
            navmeshdebug.material = matdebug;

            this.crowdInstance = this.navigationPlugin.createCrowd(1, 0.1, this.scene.instance);
            try {
              this.navmeshCreated()
            }catch (e){
              console.error(e)
            }
        })
    }

    navmeshCreated() {
        if(!this.navigationPlugin){
          return;
        }

        var agentParams = {
                radius: 0.1,
                height: 0.2,
                maxAcceleration: 2,
                maxSpeed: 2,
                collisionQueryRange: 0.5,
                pathOptimizationRange: 0.0,
                separationWeight: 1.0
        };

        let mainScene = this.scene as MainScene

        var agentIndex = this.crowdInstance.addAgent(new Vector3(0,0,0), agentParams, mainScene.player);

        this.agents.push({idx:agentIndex, trf:mainScene.player});

        let pathLine;

        const pointerDown = (mesh) => {
            const getGroundPosition = () => {
               let pickInfo = this.scene.instance.pick(this.scene.instance.pointerX, this.scene.instance.pointerY);
               if (pickInfo.hit) {
                      return pickInfo.pickedPoint;
               }
               return null;
            }

            let startingPoint = getGroundPosition();
            if (startingPoint) {

                  var agents = this.crowdInstance.getAgents();
                  var i;
                  for (i=0;i<agents.length;i++) {

                    this.crowdInstance.agentGoto(agents[i], this.navigationPlugin.getClosestPoint(startingPoint));
                  }

                  var pathPoints = this.navigationPlugin.computePath( this.crowdInstance.getAgentPosition(agents[0]), this.navigationPlugin.getClosestPoint(startingPoint));

                  pathLine = MeshBuilder.CreateDashedLines("ribbon", {points: pathPoints, updatable: true, instance: pathLine}, this.scene.instance);
            }
        }

        this.scene.instance.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                    case BABYLON.PointerEventTypes.POINTERDOWN:
                      if(pointerInfo.pickInfo.hit) {
                        pointerDown(pointerInfo.pickInfo.pickedMesh)
                      }
                      break;
            }
        })
    }


    //TODO: Make it more stable
    update() {
        if(this.agents.length > 0){
            var agentCount = this.agents.length;
            for(let i = 0;i<agentCount;i++)
            {
              var ag = this.agents[i];
              // ag.trf.position = this.crowdInstance.getAgentPosition(ag.idx);
              //

              let vel = this.crowdInstance.getAgentVelocity(ag.idx);
              // this.crowdInstance.getAgentNextTargetPathToRef(ag.idx, ag.trf.position);

              var desiredRotation = Math.atan2(vel.x, vel.z);
              ag.trf.rotation.y = ag.trf.rotation.y + (desiredRotation - ag.trf.rotation.y) * 0.05;

              // if (vel.length() > 0.2)
              //  {
              //
              //       var desiredRotation = Math.atan2(vel.x, vel.z);
              //       ag.trf.rotation.y = ag.trf.rotation.y + (desiredRotation - ag.trf.rotation.y) * 0.05;
              //  }
            }
        }
    }
}

export default NavigationSytem