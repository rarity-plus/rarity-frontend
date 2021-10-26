import BaseRPNPC from './BaseRPNPC';
import NPCManager from '../systems/NPCManager';
import MainScene from '../scenes/MainScene';
import { ActionManager, ExecuteCodeAction, MeshBuilder, Vector3, Mesh } from 'babylonjs';
import { modal } from '../../../../contexts/Modal';
import AdventureModal from '../../../../modals/AdventureModal';
import { AdvancedDynamicTexture, TextBlock } from 'babylonjs-gui';
import { infoToast } from '../../../../contexts/Notifications';

class AdventureBookNPC extends BaseRPNPC {

  zoneBox: Mesh;
  guiTexture;
  guiPlane: Mesh;

  mainSceneRef;

  create(npcManager: NPCManager) {
    super.create(npcManager);

    let mainSceneRef = this.scene as MainScene

    let bookStandArea = mainSceneRef.world.staticMeshes.find((mesh) => {
          return mesh.name === "static_book_stand";
    })

    this.zoneBox = MeshBuilder.CreateBox("book_stand_zone", {
      width: 1.5,
      height: 3
    })

    this.zoneBox.parent = this

    this.zoneBox.position = bookStandArea.absolutePosition;
    this.zoneBox.visibility = 0.1;

    this.zoneBox.actionManager = this.actionManager

    this.guiPlane = Mesh.CreatePlane("plane", 5, this.scene.instance);
    this.guiPlane.parent = this.zoneBox;
    this.guiPlane.position.y = 2;
    this.guiPlane.billboardMode = Mesh.BILLBOARDMODE_ALL
    this.guiPlane.enablePointerMoveEvents = false
    this.guiPlane.isPickable = false

    this.guiTexture = AdvancedDynamicTexture.CreateForMesh(this.guiPlane)

    let standTitleText = new TextBlock();
    standTitleText.text = "Lost Tales Book";
    standTitleText.color = "white";
    standTitleText.fontSize = 30;

    this.guiTexture.addControl(standTitleText)

    this.mainSceneRef = this.scene as MainScene

    this.zoneBox.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnRightPickTrigger, (event) => {
          if(!this.zoneBox){
            return;
          }

          if(Vector3.Distance(this.zoneBox.absolutePosition,  this.mainSceneRef.player.position) < 1.5){
            modal.show("Lost Tales Book", AdventureModal, false)
          }else{
            infoToast("Too far to interact!")
          }
    }))
  }

  update() {

    // if(this.guiPlane){
    //   this.guiPlane.lookAt( this.scene.instance.activeCamera.position)
    // }
  }
}

export default AdventureBookNPC