import {PerspectiveCamera } from "three";

export class Resizer extends EventTarget {
  #container: HTMLDivElement
  #camera: PerspectiveCamera

  constructor(container: HTMLDivElement, camera: PerspectiveCamera) {
    super()
    this.#container = container;
    this.#camera = camera;
  }

  resize() {
    this.#camera.aspect = this.#container.clientWidth / this.#container.clientHeight;

    this.#camera.updateProjectionMatrix();

    this.dispatchEvent(new ResizeEvent(this.#container.clientWidth, this.#container.clientHeight))
  }
}

export class ResizeEvent extends Event {
  static readonly type = '3:resize'

  constructor(public readonly width: number, public readonly height: number) {
    super(ResizeEvent.type)
  }
}