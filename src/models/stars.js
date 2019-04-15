import * as THREE from "three";

export default color => {
  const starsGeometry = new THREE.Geometry();

  for (let i = 0; i < 30000; i++) {
    const star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread(1200);
    star.y = THREE.Math.randFloatSpread(1200);
    star.z = THREE.Math.randFloatSpread(1200);
    starsGeometry.vertices.push(star);
  }

  for (let i = 0; i < 30000; i++) {
    const star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread(4500);
    star.y = THREE.Math.randFloatSpread(4500);
    star.z = THREE.Math.randFloatSpread(4500);
    starsGeometry.vertices.push(star);
  }

  const starsMaterial = new THREE.PointsMaterial({color});
  const starField = new THREE.Points(starsGeometry, starsMaterial);

  return starField;
};
