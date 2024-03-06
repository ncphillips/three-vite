import {BoxGeometry, Mesh, MeshBasicMaterial} from "three";

export function createCube() {
  const geometry = new BoxGeometry(2, 2, 2);

  const material = new MeshBasicMaterial({color: 0x00ff00});

  return new Mesh(geometry, material);
}