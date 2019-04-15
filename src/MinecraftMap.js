import React, {useEffect} from "react";
import styled from "styled-components";
import * as THREE from "three";

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MinecraftMap = () => {
  let renderElement = null;
  let scene, camera, renderer;

  useEffect(() => {
    const width = renderElement.clientWidth;
    const height = renderElement.clientHeight;

    // Create new scene
    scene = new THREE.Scene();

    // Create new camera
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    // Create new renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#000000");
    renderer.setSize(width, height);
    renderElement.appendChild(renderer.domElement);

    // Render the scene
    renderer.render(scene, camera);
  }, []);

  return <Canvas ref={mount => (renderElement = mount)} />;
};

export default MinecraftMap;
