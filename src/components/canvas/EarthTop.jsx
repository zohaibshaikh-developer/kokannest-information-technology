import React, { Suspense, useState, useEffect } from "react";

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

const Earth = ({isMobile}) => {
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
           child.material.emissive.set("#000"); // You can adjust the color as needed
          }
        }
      });
    }
  };

  makeModelRealistic();

  const scaleValue = isMobile ? 0.95 : 1.4;

  const positiony = isMobile ? 0.9 : 0.7;

  return (
    <mesh>
      {/* HemisphereLight */}
      <hemisphereLight intensity={0.7} groundColor="blue" />

      {/* DirectionalLight */}
      <directionalLight intensity={0.9} position={[5, 10, 10]} castShadow />

      {/* Earth */}
      <primitive object={earth.scene} scale={scaleValue} position-y={positiony} rotation-y={0} />
    </mesh>
  );
};

const EarthCanvas = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");
  
    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);
  
    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
  
    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);
  
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  

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
          autoRotateSpeed={0.85}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={1.3} />
        <Earth isMobile={isMobile} />
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
