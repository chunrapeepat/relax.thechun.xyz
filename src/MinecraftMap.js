import React, {useEffect, useState} from "react";
import styled from "styled-components";
import * as THREE from "three";
import {MTLLoader, OBJLoader} from "three-obj-mtl-loader";

import createStars from "./models/stars";

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MinecraftMap = () => {
  let tick = 1;
  let renderElement, frameId;
  let scene, camera, renderer, light, stars;

  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();

  const render = () => {
    renderer.render(scene, camera);
  };

  const animate = () => {
    render();
    tick += 1;
    frameId = window.requestAnimationFrame(animate);

    stars.rotation.x -= 0.00005;
    stars.rotation.y -= 0.00005;
    stars.rotation.z -= 0.00005;

    light.intensity = 2 + Math.sin(tick / 20) / 10;

    if (tick % 100 >= 0 && tick % 100 <= 10) {
      light.intensity = 2 + Math.sin(tick) / 10;
    }
  };

  useEffect(() => {
    const width = renderElement.clientWidth;
    const height = renderElement.clientHeight;

    // Create new scene
    scene = new THREE.Scene();

    // Create new camera
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.z = 3;
    camera.position.x = -0.7;
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
    light = new THREE.PointLight(0xffc107, 2, 150);
    light.position.set(camera.position.x, camera.position.y, camera.position.z);
    light.castShadow = true;
    scene.add(light);

    // Add Star
    stars = new THREE.Group();
    stars.add(createStars(0xffffff));
    stars.add(createStars(0xffc107));
    stars.add(createStars(0x18ffff));

    scene.add(stars);

    // Loading Minecraft Map Model
    mtlLoader.load("/tree.mtl", materials => {
      materials.preload();
      objLoader.setMaterials(materials);

      objLoader.load("/tree.obj", model => {
        scene.add(model);
        renderer.render(scene, camera);
      });
    });

    frameId = requestAnimationFrame(animate);
  }, []);

  function onMouseMove(e) {
    const width = renderElement.clientWidth / 2;
    const height = renderElement.clientHeight / 2;

    const offsetX = (e.clientX - width) / width;
    const offsetY = (height - e.clientY) / height;

    if (camera) {
      camera.position.x = offsetX / 100 - 0.7;
      camera.position.y = offsetY / 100;

      light.position.x = -(offsetX - 0.7);
      light.position.y = -offsetY;

      render();
    }
  }

  return (
    <Canvas onMouseMove={onMouseMove} ref={mount => (renderElement = mount)} />
  );
};

export default MinecraftMap;
