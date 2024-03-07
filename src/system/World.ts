import {Object3D, PerspectiveCamera, Scene} from "three";

// System
import {Canvas} from "./Canvas.ts";
import {RenderLoop, RenderEvent} from "./RenderLoop.ts";

// Components
import {createCamera} from "../components/camera.ts";
import {createLight} from "../components/light.ts";
import {createScene} from "../components/scene.ts";

export class World extends EventTarget {
  #camera: PerspectiveCamera
  #scene: Scene
  #renderLoop: RenderLoop
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

    this.#renderLoop = new RenderLoop(this.#scene, this.#camera, canvas)

    this.#container.append(this.#renderLoop.domElement);

    this.#renderLoop.addEventListener(RenderEvent.type, this.tick)

    canvas.resize()
  }

  start() {
    this.#renderLoop.start()
  }

  stop() {
    this.#renderLoop.stop()
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