import {Camera, Scene, WebGLRenderer} from "three";
import {ResizeEvent, Resizer} from "./Resizer.ts";

export class Renderer extends EventTarget {
  #scene: Scene
  #camera: Camera
  #renderer: WebGLRenderer

  constructor(scene: Scene, camera: Camera, resizer: Resizer) {
    super()
    this.#scene = scene
    this.#camera = camera
    this.#renderer = new WebGLRenderer()
    this.render()

    resizer.addEventListener(ResizeEvent.type, this.#handleResize)

    setInterval(this.render, 1000/60)
  }

  get domElement() {
    return this.#renderer.domElement
  }

  render = () => {
    this.#renderer.render(this.#scene, this.#camera)
    this.dispatchEvent(new RenderEvent())
  }

  #handleResize = (resizeEvent: Event) => {
    if (!(resizeEvent instanceof ResizeEvent)) return
    this.#renderer.setSize(resizeEvent.width, resizeEvent.height);

    this.#renderer.setPixelRatio(window.devicePixelRatio);
  };
}

export class RenderEvent extends Event {
  static readonly type = '3:render'

  constructor() {
    super(RenderEvent.type)
  }
}