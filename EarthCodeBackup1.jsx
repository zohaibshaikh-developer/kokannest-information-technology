import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette ,
  Noise
} from "@react-three/postprocessing";

import CanvasLoader from "../Loader";
// import EarthClouds from "./EarthClouds";

const Earth = () => {
  const earth = useGLTF("./earth/scene.gltf");

  const makeModelRealistic = () => {
    if (earth.scene && earth.scene.children && earth.scene.children.length > 0) {
      // Loop through all the children of the model to modify each material
      earth.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Apply physically-based rendering (PBR) materials
          child.material.metalness = 0.65;
          child.material.roughness = 1.2;

          // Check if the model has an emissive property
          if (child.material.emissive) {
            // Increase the emissive intensity to make it brighter
            child.material.emissive.set("#287AB8"); // You can adjust the color as needed
          }
        }
      });
    }
  };

  makeModelRealistic();

  return (
    <mesh>
      {/* HemisphereLight */}
      <hemisphereLight intensity={1.1} groundColor="blue" />

      {/* DirectionalLight */}
      <directionalLight intensity={1.3} position={[5, 10, 10]} castShadow />

      {/* Earth */}
      <primitive object={earth.scene} scale={1.8} position-y={0} rotation-y={0} />
    </mesh>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always"
      background="#000000"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={1.3} />
        <Earth />
        {/* <EarthClouds /> */}
        <Preload all />
        <EffectComposer>
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={0.2} height={480} />
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={2} height={300} />
          <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={0.3} />
        </EffectComposer>
        {/* <Environment preset="night" /> */}
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
