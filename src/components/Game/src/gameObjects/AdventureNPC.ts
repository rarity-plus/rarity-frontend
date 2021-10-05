import BaseRPNPC from './BaseRPNPC';
import { ActionManager, AssetsManager, ExecuteCodeAction, Mesh, MeshBuilder, Vector3 } from 'babylonjs';
import MainScene from '../scenes/MainScene';
import { modal } from '../../../../contexts/Modal';
import AdventureModal from '../../../../modals/AdventureModal';


class AdventureNPC extends BaseRPNPC {

  mesh: Mesh;
  walkAnimationGroup;
  idleAnimationGroup;

  create(instance) {
    var assetsManager = new AssetsManager(this.getScene());

    var meshTask = assetsManager.addMeshTask("character_task", "", "/assets/models/", "character.glb");

    meshTask.onSuccess =  (task) => {
      this.mesh = task.loadedMeshes[0] as Mesh
      this.mesh.setParent(this)
      this.mesh.checkCollisions = true;

      this.walkAnimationGroup = task.loadedAnimationGroups[1]
      this.idleAnimationGroup = task.loadedAnimationGroups[0]


      this.walkAnimationGroup.stop()
      this.idleAnimationGroup.start()

      // this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnRightPickTrigger, (event) => {
      //   if(!this.mesh){
      //     return;
      //   }
      //
      //   let mainScene = this.scene as MainScene
      //
      //   if(Vector3.Distance(this.position, mainScene.player.position) < 2){
      //
      //     modal.show("Adventure", AdventureModal, false)
      //   }
      // }))
      //
      // this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (event) => {
      //   if(!this.mesh){
      //     return;
      //   }
      //
      // }))
      //
      // this.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, (event) => {
      //   if(!this.mesh){
      //     return;
      //   }
      // }))

      let rpScene = this.scene as MainScene
      let spawnPoint = rpScene.world.worldPoints.find((mesh) => {
        return mesh.name === "point_npc"
      })

      this.position = new Vector3(spawnPoint.position.x , 0.01, spawnPoint.position.z)

      console.log("Mesh loaded")
    }


    assetsManager.load()


  }

}
export default AdventureNPC