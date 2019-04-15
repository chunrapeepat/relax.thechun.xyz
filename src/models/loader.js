import {MTLLoader, OBJLoader} from "three-obj-mtl-loader";

export default (path, callback) => {
  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();

  mtlLoader.load(`${path}.mtl`, materials => {
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.load(`${path}.obj`, callback);
  });
};
