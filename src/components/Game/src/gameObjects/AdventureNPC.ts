import BaseRPNPC from './BaseRPNPC';
import { ActionManager, AssetsManager, ExecuteCodeAction, Mesh, MeshBuilder, Vector3 } from 'babylonjs';
import MainScene from '../scenes/MainScene';
import { modal } from '../../../../contexts/Modal';
import AdventureModal from '../../../../modals/AdventureModal';
import { AdvancedDynamicTexture, TextBlock } from 'babylonjs-gui';
import { infoToast } from '../../../../contexts/Notifications';
import MerchantModal from '../../../../modals/MerchantModal';


class AdventureNPC extends BaseRPNPC {

  mesh: Mesh;
  walkAnimationGroup;
  idleAnimationGroup;

  zoneBox: Mesh;
  guiPlane;
  guiTexture;
  mainSceneRef;

  create(instance) {
    let assetsManager = new AssetsManager(this.getScene());

    let meshTask = assetsManager.addMeshTask("character_task", "", "/assets/models/", "character.glb");

    meshTask.onSuccess =  (task) => {
      this.mesh = task.loadedMeshes[0] as Mesh
      this.mesh.setParent(this)
      this.mesh.checkCollisions = true;

      this.walkAnimationGroup = task.loadedAnimationGroups[1]
      this.idleAnimationGroup = task.loadedAnimationGroups[0]


      this.walkAnimationGroup.stop()
      this.idleAnimationGroup.start()

      let rpScene = this.scene as MainScene
      let spawnPoint = rpScene.world.worldPoints.find((mesh) => {
        return mesh.name === "point_npc"
      })

      this.mesh.isPickable = false

      this.position = new Vector3(spawnPoint.absolutePosition.x , 0.01, spawnPoint.absolutePosition.z)
    }

    assetsManager.load()

    this.zoneBox = MeshBuilder.CreateBox("adventurer_zone", {
      width: 1.5,
      height: 3
    })

    this.zoneBox.parent = this

    this.zoneBox.visibility = 0.1;

    this.guiPlane = Mesh.CreatePlane("plane", 5, this.scene.instance);
    this.guiPlane.parent = this.zoneBox;
    this.guiPlane.position.y = 2;
    this.guiPlane.billboardMode = Mesh.BILLBOARDMODE_ALL
    this.guiPlane.isPickable = false


    this.guiTexture = AdvancedDynamicTexture.CreateForMesh(this.guiPlane)

    let standTitleText = new TextBlock();
    standTitleText.text = "Nomad Merchant";
    standTitleText.color = "white";
    standTitleText.fontSize = 30;

    this.mainSceneRef = this.scene as MainScene

    this.guiTexture.addControl(standTitleText)

    this.zoneBox.actionManager = this.actionManager

    this.zoneBox.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnRightPickTrigger, (event) => {
      if(Vector3.Distance(this.zoneBox.absolutePosition,  this.mainSceneRef.player.position) < 1.5){
        modal.show("Nomad Merchant", MerchantModal, false)
      }else{
        infoToast("Too far to interact!")
      }
    }))


  }

}
export default AdventureNPC