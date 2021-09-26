import { Mesh, MeshBuilder, Scene, TransformNode, ActionManager, ExecuteCodeAction } from 'babylonjs';
import RPScene from '../components/RPScene';


class BaseRPNPC extends TransformNode {

  actionManager: ActionManager;
  scene: RPScene;

  constructor(name: string, scene: RPScene) {
    super(name, scene.instance);
    this.scene = scene;
    this.actionManager = new ActionManager(this.scene.instance)

  }

  init() {

  }
}

export default BaseRPNPC