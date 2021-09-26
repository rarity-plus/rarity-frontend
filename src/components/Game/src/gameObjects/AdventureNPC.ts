import BaseRPNPC from './BaseRPNPC';
import { ActionManager, ExecuteCodeAction, Mesh, MeshBuilder, Vector3 } from 'babylonjs';
import MainScene from '../scenes/MainScene';
import { modal } from '../../../../contexts/Modal';
import AdventureModal from '../../../../modals/AdventureModal';


class AdventureNPC extends BaseRPNPC {

  mesh: Mesh;

  init() {
    this.mesh = MeshBuilder.CreateBox("npc_box", {size: 2}, this.scene.instance);
    this.mesh.parent = this
    this.mesh.actionManager = this.actionManager

    let adventure_pont = this.scene.instance.getMeshById("AdventureNPC_Point")

    if(adventure_pont){
      this.position = adventure_pont.position
    }

    // this.mesh.position = this.scene.instance.getMeshById("AdventureNPC_Point").position

    this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnRightPickTrigger, (event) => {
      if(!this.mesh){
        return;
      }

      let mainScene = this.scene as MainScene

      if(Vector3.Distance(this.position, mainScene.player.position) < 2){

          modal.show("Adventure", AdventureModal, false)
      }
    }))

    this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (event) => {
      if(!this.mesh){
        return;
      }

    }))

    this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, (event) => {
      if(!this.mesh){
        return;
      }


    }))
  }

}
export default AdventureNPC