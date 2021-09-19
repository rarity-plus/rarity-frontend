import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, Mesh } from 'babylonjs';


class GameEntry {

  engine: Engine = null;
  scene: Scene = null;
  canvas: HTMLCanvasElement = null;

  constructor(engine: Engine, canvas: HTMLCanvasElement) {
    this.engine = engine
    this.canvas = canvas

    this.scene = new Scene(this.engine)


    //Create scenes/objs
    this.created()

    //Update things
    this.engine.runRenderLoop(() => {
      this.render()
    })
  }

  created() {
      var camera = new FreeCamera('camera1', new Vector3(0, 5, -10), this.scene);
      // Target the camera to scene origin
      camera.setTarget(Vector3.Zero());
      // Attach the camera to the canvas
      camera.attachControl(this.canvas, false);

      // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
      var light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
      // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
      var sphere = Mesh.CreateSphere('sphere1', 16, 2, this.scene, false, BABYLON.Mesh.FRONTSIDE);
      // Move the sphere upward 1/2 of its height
      sphere.position.y = 1;
      // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
      var ground = Mesh.CreateGround('ground1', 6, 6, 2, this.scene, false);

  }

  render() {
    if(this.scene){
      this.scene.render()
    }
  }
}

export default GameEntry