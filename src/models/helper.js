import {MTLLoader, OBJLoader} from "three-obj-mtl-loader";

export const normalDistribution = x => {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-Math.pow(x, 2) / 2);
};

export const modelLoader = (path, callback) => {
  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();

  mtlLoader.load(`${path}.mtl`, materials => {
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.load(`${path}.obj`, callback);
  });
};
