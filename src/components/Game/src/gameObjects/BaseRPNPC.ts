import { Mesh, MeshBuilder, Scene, TransformNode, ActionManager, ExecuteCodeAction, AssetsManager } from 'babylonjs';
import RPScene from '../components/RPScene';
import NPCManager from '../systems/NPCManager';


class BaseRPNPC extends TransformNode {

  actionManager: ActionManager;
  scene: RPScene;
  assetManager: AssetsManager;

  public constructor(name: string, scene: RPScene) {
    super(name, scene.instance);
    this.scene = scene;
    this.actionManager = new ActionManager(this.scene.instance)
    this.assetManager = new AssetsManager(this.scene.instance)

  }

  public create(npcManager: NPCManager) {

  }

  public update() {

  }

}

export default BaseRPNPC