
abstract class RPScene {
  //
  // public readonly scene: Scene;
  // public readonly renderer: WebGLRenderer
  // public readonly camera: PerspectiveCamera;
  //
  // constructor(renderer: WebGLRenderer, camera: PerspectiveCamera) {
  //     this.scene = new Scene()
  //     this.renderer = renderer
  //     this.camera = camera
  //
  // }
  //
  // public registerEvents() {
  //   this.created()
  //   this.animate()
  // }
  //
  // animate()  {
  //     requestAnimationFrame(() => {
  //       this.animate()
  //     })
  //
  //     this.update()
  //
  //     this.renderer.render(this.scene, this.camera)
  // }
  //
  // created() {
  //
  // }
  //
  // update() {
  //
  // }

  // readonly _engine: Engine;
  // _scene: Scene;
  //
  // constructor(
  //   rootUrl: string,
  //   sceneFilename: string,
  //   engine: Engine
  // ) {
  //   this._engine = engine
  //
  //   SceneLoader.ShowLoadingScreen = false
  //
  //   SceneLoader.Load(rootUrl, sceneFilename, this._engine, (scene) => {
  //       this._scene = scene
  //
  //       this.onSceneLoaded(this._scene)
  //
  //       this._scene.registerBeforeRender(() => {
  //         this.update()
  //       })
  //
  //       this._engine.runRenderLoop(() => {
  //         this._scene.render()
  //       })
  //   }, (event: ISceneLoaderProgressEvent) => {
  //       this.onSceneLoading(event)
  //   }, (scene: Scene, message: string, exception?: any) => {
  //       console.error(message)
  //
  //       this.onSceneLoadingError(scene, message, exception)
  //   })
  // }
  //
  // update() {
  //
  // }
  //
  // onSceneLoaded(scene: Scene) {
  //
  // }
  //
  // onSceneLoading(event: ISceneLoaderProgressEvent) {
  //
  // }
  //
  // onSceneLoadingError(scene: Scene, message: string, exception?: any) {
  //
  // }

}


export default RPScene