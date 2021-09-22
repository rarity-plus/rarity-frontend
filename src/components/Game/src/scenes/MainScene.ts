import RPScene from '../components/RPScene';
import RPPlayer from '../gameObjects/RPPlayer';
<<<<<<< HEAD
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, WebGLRenderer } from 'three';
=======

class MainScene extends RPScene {

  light: HemisphericLight;
  public camera: ArcRotateCamera;

  player: RPPlayer
  navigationPlugin: RecastJSPlugin;

  onSceneLoaded(scene: Scene) {
    super.onSceneLoaded(scene);

    try{
      this.navigationPlugin = new RecastJSPlugin();
    }catch (e){
      console.log(e)
    }

    this.camera = new ArcRotateCamera("Camera", 1, 1, 4, Vector3.Zero(), this._scene)

    this.camera.attachControl(this._engine.inputElement, false);

    this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this._scene);

    this.player = new RPPlayer(scene, this.camera)

    let plane = this._scene.getMeshByName("Plane") as Mesh

    // this.navigationPlugin.createNavMesh([plane], {
    //   ch: 0,
    //   cs: 0,
    //   detailSampleDist: 0,
    //   detailSampleMaxError: 0,
    //   maxEdgeLen: 0,
    //   maxSimplificationError: 0,
    //   maxVertsPerPoly: 0,
    //   mergeRegionArea: 0,
    //   minRegionArea: 0,
    //   walkableClimb: 0,
    //   walkableHeight: 0,
    //   walkableRadius: 0,
    //   walkableSlopeAngle: 0
    //
    // })

  }
>>>>>>> parent of c851827 (Use another path finding library)

class MainScene extends RPScene {

  // cube: Mesh;
  //
  // constructor(renderer: WebGLRenderer, camera: PerspectiveCamera) {
  //   super(renderer,camera);
  //
  //   const geometry = new BoxGeometry();
  //   const material = new MeshBasicMaterial( { color: 0x00ff00 } );
  //   this.cube = new Mesh( geometry, material );
  //
  //   this.scene.add(this.cube)
  // }
  //
  //
  // created() {
  //   // console.log("Created")
  //   //
  //   // const geometry = new BoxGeometry();
  //   // const material = new MeshBasicMaterial( { color: 0x00ff00 } );
  //   // this.cube = new Mesh( geometry, material );
  //   //
  //   // if(this.cube){
  //   //   console.log("Cube created")
  //   // }
  //   //
  //   // this.scene.add(this.cube)
  // }
  //
  // update() {
  //   // console.log(this.cube)
  //   if(this.cube){
  //     this.cube.rotation.x += 0.1;
  //     this.cube.rotation.y += 0.1;
  //   }
  // }
}

export default MainScene