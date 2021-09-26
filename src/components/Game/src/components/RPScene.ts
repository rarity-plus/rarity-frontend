import { Scene, ArcRotateCamera, Engine ,Vector3 } from 'babylonjs';

abstract class RPScene {

  instance: Scene;
  engineInstance: Engine;

  constructor(engine: Engine) {
      this.engineInstance = engine;
      this.instance = new Scene(engine)
  }

  /**
   * Registers the events
   */
  registerEvents() {
    try{
      this.asyncCreate()
    }catch (e){
      console.error(e)
    }

    if(this.instance){
      this.instance.registerBeforeRender(() => {
        this.update()
        this.lateUpdate()
      })

      this.instance.registerAfterRender(() => {
        this.afterRender()
      })
    }

    if(this.engineInstance){
      this.engineInstance.runRenderLoop(() => {
        //TODO: Check if the order is correct
        this.render()
        this.instance.render()
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