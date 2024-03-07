import {Camera, Clock, Scene, WebGLRenderer} from "three";
import {CanvasResizeEvent, Canvas} from "./Canvas.ts";

export class RenderLoop extends EventTarget {
  #clock = new Clock()
  #scene: Scene
  #camera: Camera
  #renderer: WebGLRenderer
  speed = 1

  constructor(scene: Scene, camera: Camera, resizer: Canvas) {
    super()
    this.#scene = scene
    this.#camera = camera
    this.#renderer = new WebGLRenderer({
      antialias: true
    })
    this.render()

    resizer.addEventListener(CanvasResizeEvent.type, this.#handleResize)
  }

  start() {
    this.#renderer.setAnimationLoop(this.render)
  }

  stop() {
    this.#renderer.setAnimationLoop(null)
  }

  get domElement() {
    return this.#renderer.domElement
  }

  render = () => {
    const delta = this.#clock.getDelta() * this.speed
    this.#renderer.render(this.#scene, this.#camera)
    this.dispatchEvent(new RenderEvent(delta))
  }

  #handleResize = (resizeEvent: Event) => {
    if (!(resizeEvent instanceof CanvasResizeEvent)) return

    this.#renderer.setSize(resizeEvent.width, resizeEvent.height);

    this.#renderer.setPixelRatio(window.devicePixelRatio);
  };
}

export class RenderEvent extends Event {
  static readonly type = 'Renderer:render'

  constructor(public readonly delta: number) {
    super(RenderEvent.type)
  }
}