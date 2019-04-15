import {MTLLoader, OBJLoader} from "three-obj-mtl-loader";

export const sigmoid = (x, normal) => {
  return 1 - 1 / (1 + Math.exp(-((-x / normal) * 12 + 6)));
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
