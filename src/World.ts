import {createCamera} from "./components/camera.ts";
import {createScene} from "./components/scene.ts";
import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {createRenderer} from "./system/renderer.ts";
import {createCube} from "./components/cube.ts";
import {Resizer} from "./system/Resizer.ts";
import {createLight} from "./components/light.ts";

export class World {
  #camera: PerspectiveCamera
  #scene: Scene
  #renderer: WebGLRenderer
  #container: HTMLDivElement

  constructor(
    container: HTMLDivElement
  ) {
    this.#camera = createCamera();
    this.#scene = createScene();
    this.#renderer = createRenderer()
    this.#container = container;

    this.#container.append(this.#renderer.domElement);

    this.#scene.add(createCube(), createLight())

    new Resizer(container, this.#camera, this.#renderer)
  }


  render() {
    this.#renderer.render(this.#scene, this.#camera);
  }
}