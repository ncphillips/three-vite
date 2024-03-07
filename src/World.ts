import {createCamera} from "./components/camera.ts";
import {createScene} from "./components/scene.ts";
import {Object3D, PerspectiveCamera, Scene} from "three";
import {Resizer} from "./system/Resizer.ts";
import {createLight} from "./components/light.ts";
import {Renderer} from "./system/renderer.ts";

export class World {
  #camera: PerspectiveCamera
  #scene: Scene
  #renderer: Renderer
  #container: HTMLDivElement

  constructor(
    container: HTMLDivElement
  ) {
    this.#camera = createCamera();
    const resizer = new Resizer(container, this.#camera)
    this.#scene = createScene();
    this.#renderer = new Renderer(this.#scene, this.#camera, resizer)
    this.#container = container;

    this.#container.append(this.#renderer.domElement);

    this.#scene.add(createLight())

    resizer.resize()
  }

  add(...args: Object3D[]) {
    this.#scene.add(...args)
  }
}