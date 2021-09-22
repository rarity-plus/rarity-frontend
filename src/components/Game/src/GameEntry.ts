class GameEntry {


  constructor(canvas) {
  }

  // application: Application;
  //
  // constructor( canvas: Element) {
  //
  //   this.application = new Application(canvas, {})
  //
  //   this.application.setCanvasFillMode(FILLMODE_FILL_WINDOW);
  //   this.application.setCanvasResolution(RESOLUTION_AUTO);
  //
  //   // const box = new Entity('cube');
  //   // box.addComponent('model', {
  //   //   type: 'box'
  //   // });
  //   // this.application.root.addChild(box);
  //
  //   const character = new Entity();
  //   this.application.loader.load("/assets/models/character.glb", 'model', (err, asset) => {
  //     character.addComponent('model')
  //     character.setPosition(1,1,1)
  //     character.setLocalScale(3, 3, 3);
  //
  //     character.model.model = asset.resource
  //
  //   })
  //
  //   this.application.root.addChild(character)
  //
  //   // create camera entity
  //   const camera = new Entity('camera');
  //   camera.addComponent('camera', {
  //     clearColor: new Color(0.1, 0.1, 0.1)
  //   });
  //   this.application.root.addChild(camera);
  //   camera.setPosition(0, 0, 3);
  //
  //   // create directional light entity
  //   const light = new Entity('light');
  //   light.addComponent('light');
  //   this.application.root.addChild(light);
  //   light.setEulerAngles(45, 0, 0);
  //
  //   // rotate the box according to the delta time since the last frame
  //   this.application.on('update', dt => {
  //
  //   });
  //
  //   this.application.start();
  //
  //   // this.camera = new PerspectiveCamera( 75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000 );
  //   // this.camera.position.z = 5;
  //   //
  //   // this.renderer = new WebGLRenderer()
  //   // this.renderer.setSize(canvas.clientWidth,  canvas.clientHeight)
  //   // canvas.append(this.renderer.domElement)
  //   //
  //   // this.scene = new MainScene(this.renderer, this.camera)
  //   // this.scene.registerEvents()
  //
  //
  //   // this.world = new ECSYThreeWorld();
  //   //
  //   // this.world.registerComponent(Rotating)
  //   // this.world.registerSystem(RotationSystem)
  //   // this.ecsObj = initialize(this.world);
  //   //
  //   // this.ecsObj.renderer.setSize(canvas.clientWidth,  canvas.clientHeight)
  //   // // this.ecsObj.camera.position
  //   // this.ecsObj.camera.fov = 75;
  //   // this.ecsObj.camera.aspect = canvas.clientWidth / canvas.clientHeight
  //   // this.ecsObj.camera.near = 0.1
  //   // this.ecsObj.camera.far = 1000
  //   // this.ecsObj.camera.position.z = 5
  //   //
  //   // canvas.append(this.ecsObj.renderer.domElement)
  //   //
  //   // this.scene = this.world.createEntity("Scene").addObject3DComponent(new Scene())
  //   //
  //   // const geometry = new BoxBufferGeometry(20, 20, 20);
  //   // const material = new MeshBasicMaterial( { color: 0x00ff00 } );
  //   // const mesh = new Mesh(geometry, material);
  //   //
  //   // const box = this.world.createEntity("Box").addComponent(Rotating).addObject3DComponent(mesh, this.scene)
  //   // box.getObject3D().position.x = 2
  //   // this.scene = new Scene()
  //   // this.camera = new PerspectiveCamera( 75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000 );
  //   // this.renderer = new  WebGLRenderer();
  //   // this.renderer.setSize( canvas.clientWidth,  canvas.clientHeight);
  //   // canvas.append(this.renderer.domElement)
  //   //
  //   // const geometry = new BoxGeometry();
  //   // const material = new MeshBasicMaterial( { color: 0x00ff00 } );
  //   // this.cube = new Mesh( geometry, material );
  //   //
  //   //
  //   // this.camera.position.z = 5;
  //   //
  //   // this.scene.add(this.cube)
  //
  //
  //   // this.render()
  //   // this.engine = new Engine(canvas, false, {preserveDrawingBuffer: true, stencil: true})
  //   // this.engine.enableOfflineSupport = false
  //   //
  //   // this.canvas = canvas
  //   //
  //   // this.scene = new MainScene("/assets/scenes/", "test.babylon", this.engine)
  // }


  public engineResize() {
    // if(this.application){
    //   this.application.resizeCanvas()
    // }
  }

  public engineDispose() {

  }
}

export default GameEntry