import { Engine, Scene, SceneLoader } from 'babylonjs';
import { ISceneLoaderProgressEvent } from 'babylonjs/Loading/sceneLoader';


abstract class RPScene {

  readonly _engine: Engine;
  _scene: Scene;

  constructor(
    rootUrl: string,
    sceneFilename: string,
    engine: Engine
  ) {
    this._engine = engine

    SceneLoader.Load(rootUrl, sceneFilename, this._engine, (scene) => {
        this._scene = scene

        this.onSceneLoaded(this._scene)

        this._scene.registerBeforeRender(() => {
          this.update()
        })

        this._engine.runRenderLoop(() => {
          this._scene.render()
        })
    }, (event: ISceneLoaderProgressEvent) => {
        this.onSceneLoading(event)
    }, (scene: Scene, message: string, exception?: any) => {
        console.error(message)

        this.onSceneLoadingError(scene, message, exception)
    })
  }

  update() {

  }

  onSceneLoaded(scene: Scene) {

  }

  onSceneLoading(event: ISceneLoaderProgressEvent) {

  }

  onSceneLoadingError(scene: Scene, message: string, exception?: any) {

  }

}


export default RPScene