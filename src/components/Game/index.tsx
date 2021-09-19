import React, { createElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, Mesh } from 'babylonjs';
import { observer } from "mobx-react-lite"


const GameWrapperPanel = styled.div`
  width: auto;
  height: auto;
  max-height: 100vh;
  overflow: hidden;
`

const Game = observer(({children}) => {
  const panelRef = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [mainScene, setMainScene] = useState<Scene>()

  const [initialize, setInitialize] = useState(false)

  useEffect(() => {
    if(initialize){
      return;
    }

    var engine = new Engine(canvasRef.current, true, {preserveDrawingBuffer: true, stencil: true});

    var createScene = function(){
      // Create a basic BJS Scene object
      var scene = new Scene(engine);
      // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
      var camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
      // Target the camera to scene origin
      camera.setTarget(Vector3.Zero());
      // Attach the camera to the canvas
      camera.attachControl(canvasRef.current, false);
      // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
      var light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
      // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
      var sphere = Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
      // Move the sphere upward 1/2 of its height
      sphere.position.y = 1;
      // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
      var ground = Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
      // Return the created scene
      return scene;
    }
    var scene = createScene();

    setMainScene(scene)

    setInitialize(true)

    engine.runRenderLoop(function(){
      scene.render();
    });
// the canvas/window resize event handler
    window.addEventListener('resize', function(){
      engine.resize();
    });


    return () => {

    }
  }, [])

  return (
    <GameWrapperPanel ref={panelRef}>
      {children}

      <canvas ref={canvasRef} style={{border: "5px solid #fff", width: "100%", height: "100vh"}}>

      </canvas>

    </GameWrapperPanel>
  )
})

export default Game