import { RecastJSPlugin, INavMeshParameters } from 'babylonjs';

// @ts-ignore
import Recast from 'recast-detour/recast'
import RPScene from '../components/RPScene';


class NavigationSytem {

    navigationPlugin: RecastJSPlugin;
    recastInstance: Recast;
    scene: RPScene;

    agents = []

    navMeshOptions: INavMeshParameters = {
        borderSize: 0,
        ch: 0,
        cs: 0,
        detailSampleDist: 0,
        detailSampleMaxError: 0,
        maxEdgeLen: 0,
        maxSimplificationError: 0,
        maxVertsPerPoly: 0,
        mergeRegionArea: 0,
        minRegionArea: 0,
        tileSize: 0,
        walkableClimb: 0,
        walkableHeight: 0,
        walkableRadius: 0,
        walkableSlopeAngle: 0

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
        }catch (e){
            console.error(e)
        }
    }

    createNavmesh() {
        if(!this.navigationPlugin){
            return;
        }

        this.navigationPlugin.createNavMesh([], this.navMeshOptions, (navmeshData) => {
            this.navmeshData = navmeshData

            this.navmeshCreated()
        })
    }

    navmeshCreated() {

    }

    update() {

    }
}

export default NavigationSytem