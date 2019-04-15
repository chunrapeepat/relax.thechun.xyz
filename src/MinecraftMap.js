import React, {useEffect, useState} from "react";
import styled from "styled-components";
import * as THREE from "three";

import {modelLoader, normalDistribution} from "./models/helper";
import createStars from "./models/stars";

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
`;

const treeOffset = {x: -0.7, y: 0, z: 3};
const earthOffset = {x: -600, y: 550, z: -1800};

const MinecraftMap = () => {
  let offset = treeOffset;
  let isEarth = false;

  let tick = 1;
  let counter = 1;
  let isMoving = false;
  let renderElement, frameId;
  let scene, camera, renderer, light, stars, earth;

  const render = () => {
    renderer.render(scene, camera);
  };

  const toggleMove = () => {
    isMoving = true;
    counter = 1;

    if (isEarth) {
      offset = treeOffset;
    } else {
      offset = earthOffset;
    }
  };

  window.toggleMove = toggleMove;

  const animate = () => {
    render();
    tick += 1;
    frameId = window.requestAnimationFrame(animate);

    if (!stars || !earth) return;

    if (isMoving && counter >= 100) {
      isMoving = false;
      return;
    }

    if (isMoving) {
      counter++;

      camera.position.x += (earthOffset.x - treeOffset.x) / 100;
      camera.position.y += (earthOffset.y - treeOffset.y) / 100;
      camera.position.z += (earthOffset.z - treeOffset.z) / 100;

      return;
    }

    stars.rotation.x -= 0.00005;
    stars.rotation.y -= 0.00005;
    stars.rotation.z -= 0.00005;

    earth.rotation.x -= 0.001;
    earth.rotation.y -= 0.001;
    earth.rotation.z -= 0.001;

    light.intensity = 2 + Math.sin(tick / 20) / 10;

    if (tick % 300 >= 0 && tick % 300 <= 10) {
      light.intensity = 2 + Math.sin(tick) / 10;
    }
  };

  useEffect(() => {
    const width = renderElement.clientWidth;
    const height = renderElement.clientHeight;

    // Create new scene
    scene = new THREE.Scene();

    // Create new camera
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 4000);
    camera.position.z = offset.z;
    camera.position.x = offset.x;
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

    // Add Fog
    scene.fog = new THREE.Fog(0x000000, 1, 5000);
    scene.background = new THREE.Color(0x000000);

    // Loading Tree
    modelLoader("/tree", tree => {
      scene.add(tree);
    });

    // Loading Minecraft Earth
    const earthLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(earthLight);

    modelLoader("/earth", earthModel => {
      earthModel.position.x = -600;
      earthModel.position.y = 800;
      earthModel.position.z = -3000;
      scene.add(earthModel);

      earth = earthModel;
    });

    frameId = requestAnimationFrame(animate);
  }, []);

  function onMouseMove(e) {
    const width = renderElement.clientWidth / 2;
    const height = renderElement.clientHeight / 2;

    const offsetX = (e.clientX - width) / width;
    const offsetY = (height - e.clientY) / height;

    if (camera && !isMoving) {
      camera.position.x = offset.x + offsetX / 100;
      camera.position.y = offset.y + offsetY / 100;

      light.position.x = -(offsetX + offset.x);
      light.position.y = -offsetY + offset.y;

      render();
    }
  }

  return (
    <Canvas onMouseMove={onMouseMove} ref={mount => (renderElement = mount)} />
  );
};

export default MinecraftMap;
