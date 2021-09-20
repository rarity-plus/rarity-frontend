import { Scene, Engine, FreeCamera, KeyboardEventTypes, SceneLoader,Color3, Vector3, HemisphericLight, Mesh,ArcRotateCamera  } from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import "@babylonjs/inspector";
import MainScene from './scenes/MainScene';

class GameEntry {

  engine: Engine = null;
  scene: MainScene = null;
  canvas: HTMLCanvasElement = null;

  fpsText: GUI.TextBlock;

  constructor( canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, false, {preserveDrawingBuffer: true, stencil: true})
    this.canvas = canvas

    this.scene = new MainScene("/assets/scenes/", "test.babylon", this.engine)
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