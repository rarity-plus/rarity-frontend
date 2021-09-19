import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, Mesh,  } from 'babylonjs';
import * as GUI from 'babylonjs-gui';


class GameEntry {

  engine: Engine = null;
  scene: Scene = null;
  canvas: HTMLCanvasElement = null;

  fpsText: GUI.TextBlock;

  constructor( canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, false, {preserveDrawingBuffer: true, stencil: true})
    this.canvas = canvas

    this.scene = new Scene(this.engine)

    //Create scenes/objs
    this.created()

    this.scene.registerBeforeRender(() => {
        this.update()
    })

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

      var advText = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI",true,this.scene)

      this.fpsText = new GUI.TextBlock("fpsText", "10 FPS")
      advText.addControl( this.fpsText)

      this.fpsText.left = '900px'
      this.fpsText.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
      this.fpsText.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP


      // this.scene.registerBeforeRender(() => {
      //   this.fpsText.text = this.engine.getFps().toFixed()
      // })

  }

  update() {

  }

  render() {
    if(this.scene){
      this.scene.render()

      // console.log("FPS: ",this.engine.getFps().toFixed())
    }
  }

  public engineResize() {
    if(this.engine){
      this.engine.resize()
    }
  }

  public engineDispose() {
    if(this.engine){
      this.engine.dispose()
    }
  }
}

export default GameEntry