import { Scene, ArcRotateCamera, Engine ,Vector3 } from 'babylonjs';

abstract class RPScene {

  scene: Scene;
  engine: Engine;

  constructor(engine: Engine) {
      this.engine = engine;
      this.scene = new Scene(engine)
  }

  /**
   * Registers the events
   */
  registerEvents() {
    this.asyncCreate()

    if(this.scene){
      this.scene.registerBeforeRender(() => {
        this.update()
        this.lateUpdate()
      })

      this.scene.registerAfterRender(() => {
        this.afterRender()
      })
    }

    if(this.engine){
      this.engine.runRenderLoop(() => {
        //TODO: Check if the order is correct
        this.render()
        this.scene.render()
      })
    }
  }

  /**
   * Is called after the constructor
   */
  async asyncCreate() {

  }

  /**
   * Is called before rendering
   */
  update() {

  }

  /**
   * Is called after update and before rendering
   */
  lateUpdate() {

  }

  /**
   * Is called after rendering
   */
  afterRender() {

  }

  /**
   * Is called when rendering
   */
  render() {

  }
}


export default RPScene