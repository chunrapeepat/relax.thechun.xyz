import React, {useEffect} from "react";
import styled from "styled-components";
import * as THREE from "three";
import {MTLLoader, OBJLoader} from "three-obj-mtl-loader";
import {ColorKeyframeTrack} from "three";

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MinecraftMap = () => {
  let renderElement = null;
  let scene, camera, renderer;

  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();

  useEffect(() => {
    const width = renderElement.clientWidth;
    const height = renderElement.clientHeight;

    // Create new scene
    scene = new THREE.Scene();

    // Create new camera
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.z = 3;
    camera.position.x -= 0.7;
    camera.rotation.x += 0.2;
    camera.zoom = 5;
    camera.updateProjectionMatrix();

    // Create new renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#000000");
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderElement.appendChild(renderer.domElement);

    // Add Light
    const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(light);

    // Loading Minecraft Map Model
    mtlLoader.load("/tree.mtl", minecraftModelMaterials => {
      minecraftModelMaterials.preload();
      objLoader.setMaterials(minecraftModelMaterials);

      objLoader.load("/tree.obj", minecraftModel => {
        scene.add(minecraftModel);
        renderer.render(scene, camera);
      });
    });

    // Render the scene
    renderer.render(scene, camera);
  }, []);

  return <Canvas ref={mount => (renderElement = mount)} />;
};

export default MinecraftMap;
