import RPScene from '../components/RPScene';
import { GUI3DManager, TextBlock, StackPanel3D, PlanePanel, Control3D } from 'babylonjs-gui';
import { Vector3, TransformNode } from 'babylonjs';


//TODO: Atm this isn't needed
class WorldGUISystem {

  private static instance: WorldGUISystem;

  private scene: RPScene;
  public guiManager: GUI3DManager;

  private controlsToRegister: Control3D[] = []

  private constructor() {}

  public static get() {
    if(!WorldGUISystem.instance){
      WorldGUISystem.instance = new WorldGUISystem()
    }

    return WorldGUISystem.instance
  }

  public register(scene: RPScene) {
    if(this.guiManager){
      console.warn("[WorldGUISystem]:", "WorldGUISystem already registered")
      return;
    }

    this.scene = scene
    try{
      this.guiManager = new GUI3DManager(this.scene.instance)

      // var anchor = new TransformNode("");
      // anchor.position = new Vector3(0,10,0)
      //
      // let stkp = new PlanePanel()
      // stkp.position = new Vector3(0,10,0)
      // stkp.scaling = new Vector3(20,20,20)
      // stkp.margin = 2
      // this.guiManager.addControl(stkp)
      // stkp.linkToTransformNode(anchor)
      //
      // let txtB = new TextBlock("npc_text", "Adventure aaaaaaaaaaaaaaaaaa")
      //
      // this.guiManager.addControl(stkp)
    }catch (e){
      console.log(e)
    }

  }

  public buildControls() {
    if(!this.guiManager){
      console.error("[WorldGUISystem]:", "GuiManager isn't valid")
      return;
    }

    if(this.controlsToRegister.length > 0){
      this.controlsToRegister.forEach((control) => {
        this.guiManager.addControl(control)
      })
    }

  }

  public registerControl(control: Control3D) {
    this.controlsToRegister.push(control)
  }
}

export default WorldGUISystem