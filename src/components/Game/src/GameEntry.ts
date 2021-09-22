import { ArcRotateCamera, Engine, Vector3 } from 'babylonjs';
import MainScene from './scenes/MainScene';

class GameEntry {

  engine: Engine;
  scene: MainScene;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, false, {preserveDrawingBuffer: true, stencil: true})
    this.engine.enableOfflineSupport = false

    this.scene = new MainScene(this.engine)
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