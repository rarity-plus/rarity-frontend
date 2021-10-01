import RPScene from '../components/RPScene';
import BaseRPNPC from '../gameObjects/BaseRPNPC';

interface NPCListObj {
  [key: string]: {
    npcClass: typeof BaseRPNPC
  }
}

//TODO: Find a better naming
class NPCManager {

  scene: RPScene;

  private static instance: NPCManager;

  createdNPCs: {[key: string] : {npcInstance: BaseRPNPC}};

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
          this.createdNPCs[key].npcInstance = new npcObj[key].npcClass(key, this.scene);

          if(this.createdNPCs[key].npcInstance.create){
            this.createdNPCs[key].npcInstance.create(this)
          }
      })
  }

  public update() {
    if(Object.keys(this.createdNPCs).length <= 0){
      return;
    }

    Object.keys(this.createdNPCs).forEach((key) => {

      if(this.createdNPCs[key].npcInstance.update){
        this.createdNPCs[key].npcInstance.update()
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