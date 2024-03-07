import {createCamera} from "./components/camera.ts";
import {createScene} from "./components/scene.ts";
import {Object3D, PerspectiveCamera, Scene} from "three";
import {Canvas} from "./system/Canvas.ts";
import {createLight} from "./components/light.ts";
import {Renderer} from "./system/Renderer.ts";

export class World {
  #camera: PerspectiveCamera
  #scene: Scene
  #renderer: Renderer
  #container: HTMLDivElement

  constructor(
    container: HTMLDivElement
  ) {
    const canvas = new Canvas(container)

    this.#container = container;

    this.#camera = createCamera(canvas);
    this.#scene = createScene();
    this.#renderer = new Renderer(this.#scene, this.#camera, canvas)

    this.#container.append(this.#renderer.domElement);

    this.#scene.add(createLight())

    canvas.resize()
  }

  add(...args: Object3D[]) {
    this.#scene.add(...args)
  }
}