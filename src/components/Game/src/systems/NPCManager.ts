import RPScene from '../components/RPScene';
import BaseRPNPC from '../gameObjects/BaseRPNPC';

interface NPCListObj {
  [key: string]: {
    npcClass: BaseRPNPC
  }
}

//TODO: Find a better naming
class NPCManager {

  scene: RPScene;

  private static instance: NPCManager;

  createdNPCs: NPCListObj;

  private constructor() {

  }

  public static get() {
    if(!NPCManager.instance){
      NPCManager.instance = new NPCManager()
    }

    return NPCManager.instance
  }

  public register(scene: RPScene) {
    if(this.scene){
      console.warn("[NPCManager]:", "Already registered")
      return;
    }

    this.scene = scene
  }

  public registerNPCs(npcObj: NPCListObj) {
      if(!npcObj){
        console.warn("[NPCManager]:", "Empty NPC collection obj")
        return;
      }

      Object.keys(npcObj).forEach((key) => {
          this.createdNPCs[key] = npcObj[key]

          if(this.createdNPCs[key].npcClass.create){
            this.createdNPCs[key].npcClass.create(this)
          }
      })
  }

  public update() {
    Object.keys(this.createdNPCs).forEach((key) => {

      if(this.createdNPCs[key].npcClass.update){
        this.createdNPCs[key].npcClass.update()
      }
    })
  }

  public getNPCByKey(key: string) {
    if(!this.createdNPCs[key]){
      console.error("[NPCManager]:", "NPC not found!")
      return;
    }

    return this.createdNPCs[key]
  }

}

export default NPCManager