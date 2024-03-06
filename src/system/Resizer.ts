import {PerspectiveCamera, WebGLRenderer} from "three";

export class Resizer {
  #container: HTMLDivElement
  #camera: PerspectiveCamera
  #renderer: WebGLRenderer

  constructor(container: HTMLDivElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    this.#container = container;
    this.#camera = camera;
    this.#renderer = renderer;

    this.resize()
  }

  private resize() {
    this.#camera.aspect = this.#container.clientWidth / this.#container.clientHeight;

    this.#camera.updateProjectionMatrix();

    this.#renderer.setSize(this.#container.clientWidth, this.#container.clientHeight);

    this.#renderer.setPixelRatio(window.devicePixelRatio);
  }
}