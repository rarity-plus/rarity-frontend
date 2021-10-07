import RPScene from '../components/RPScene';
import BaseRPNPC from '../gameObjects/BaseRPNPC';

type CreatedNPCType = {
  name: string,
  instance: BaseRPNPC
}

type RegisteredNPCType = {
  name: string,
  classType: typeof BaseRPNPC
}

class NPCManager {

  scene: RPScene;

  private static instance: NPCManager;

  createdNPCs: CreatedNPCType[] = []

  registeredNPCs: RegisteredNPCType[] = []

  private constructor() {}

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

  public registerNPCs(npcs: RegisteredNPCType[]) {
      this.registeredNPCs = this.registeredNPCs.concat(npcs)
  }

  public async createNPCs() {
    if(this.registeredNPCs.length <= 0){
      console.warn("[NPCManager]:", "0 NPCs to create!")
      return;
    }

    if(!this.scene){
      console.error("[NPCManager]:", "Scene is invalid!")
      return;
    }

    console.info("[NPCManager]:", `Creating ${this.registeredNPCs.length} NPCs!`)

    this.registeredNPCs.forEach((npc) => {
      const classInstance =  new npc.classType(npc.name, this.scene)

      this.createdNPCs.push({
        name: npc.name,
        instance: classInstance
      })

      if(classInstance.create){
        classInstance.create(this)
      }

    })
  }

  public update() {
    if(this.createdNPCs.length > 0){
      this.createdNPCs.forEach((npc) => {

        if(npc.instance.update){
          npc.instance.update()
        }
      })
    }
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