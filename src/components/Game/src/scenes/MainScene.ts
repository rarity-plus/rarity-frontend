import RPScene from '../components/RPScene';
import RPPlayer from '../gameObjects/RPPlayer';
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, WebGLRenderer } from 'three';

class MainScene extends RPScene {

  // cube: Mesh;
  //
  // constructor(renderer: WebGLRenderer, camera: PerspectiveCamera) {
  //   super(renderer,camera);
  //
  //   const geometry = new BoxGeometry();
  //   const material = new MeshBasicMaterial( { color: 0x00ff00 } );
  //   this.cube = new Mesh( geometry, material );
  //
  //   this.scene.add(this.cube)
  // }
  //
  //
  // created() {
  //   // console.log("Created")
  //   //
  //   // const geometry = new BoxGeometry();
  //   // const material = new MeshBasicMaterial( { color: 0x00ff00 } );
  //   // this.cube = new Mesh( geometry, material );
  //   //
  //   // if(this.cube){
  //   //   console.log("Cube created")
  //   // }
  //   //
  //   // this.scene.add(this.cube)
  // }
  //
  // update() {
  //   // console.log(this.cube)
  //   if(this.cube){
  //     this.cube.rotation.x += 0.1;
  //     this.cube.rotation.y += 0.1;
  //   }
  // }
}

export default MainScene