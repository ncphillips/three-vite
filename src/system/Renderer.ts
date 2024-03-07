import {Camera, Scene, WebGLRenderer} from "three";
import {CanvasResizeEvent, Canvas} from "./Canvas.ts";

export class Renderer extends EventTarget {
  #scene: Scene
  #camera: Camera
  #renderer: WebGLRenderer

  constructor(scene: Scene, camera: Camera, resizer: Canvas) {
    super()
    this.#scene = scene
    this.#camera = camera
    this.#renderer = new WebGLRenderer({
      antialias: true
    })
    this.render()

    resizer.addEventListener(CanvasResizeEvent.type, this.#handleResize)

    setInterval(this.render, 1000 / 60)
  }

  get domElement() {
    return this.#renderer.domElement
  }

  render = () => {
    this.#renderer.render(this.#scene, this.#camera)
    this.dispatchEvent(new RenderEvent())
  }

  #handleResize = (resizeEvent: Event) => {
    if (!(resizeEvent instanceof CanvasResizeEvent)) return

    this.#renderer.setSize(resizeEvent.width, resizeEvent.height);

    this.#renderer.setPixelRatio(window.devicePixelRatio);
  };
}

export class RenderEvent extends Event {
  static readonly type = 'Renderer:render'

  constructor() {
    super(RenderEvent.type)
  }
}