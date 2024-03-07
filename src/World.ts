import {createCamera} from "./components/camera.ts";
import {createScene} from "./components/scene.ts";
import {Object3D, PerspectiveCamera, Scene} from "three";
import {Canvas} from "./system/Canvas.ts";
import {createLight} from "./components/light.ts";
import {Renderer, RenderEvent} from "./system/Renderer.ts";

export class World extends EventTarget {
  #camera: PerspectiveCamera
  #scene: Scene
  #renderer: Renderer
  #container: HTMLDivElement

  constructor(
    container: HTMLDivElement
  ) {
    super()
    const canvas = new Canvas(container)

    this.#container = container;

    this.#camera = createCamera(canvas);

    this.#scene = createScene();
    this.#scene.add(createLight())

    this.#renderer = new Renderer(this.#scene, this.#camera, canvas)

    this.#container.append(this.#renderer.domElement);

    this.#renderer.addEventListener(RenderEvent.type, this.tick)

    canvas.resize()
  }

  add(...args: Object3D[]) {
    this.#scene.add(...args)
  }

  onTick(callback: () => void) {
    this.addEventListener(WorldTickEvent.type, callback)
  }

  private tick = () => {
    this.dispatchEvent(new WorldTickEvent())
  }

}

export class WorldTickEvent extends Event {
  static readonly type = 'world:tick'

  constructor() {
    super(WorldTickEvent.type)
  }
}