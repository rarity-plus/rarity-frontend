import RPScene from '../components/RPScene';
import RPPlayer from '../gameObjects/RPPlayer';
import { ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, RecastJSPlugin } from 'babylonjs';

// @ts-ignore
import Recast from 'recast-detour/recast'

class MainScene extends RPScene {

  create() {
    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), this.scene);
    camera.attachControl(this.engine.getRenderingCanvas(), true);
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

    const box = MeshBuilder.CreateBox("box", {}, this.scene);

    (async () => {
      try{
        const recast = await Recast()
        let navigationPlugin = new RecastJSPlugin(recast);
      }catch (e){
        console.log(e)
      }
    })()

  }

  update() {

  }

}


export default MainScene