import throttle from "lodash.throttle"

export class Canvas extends EventTarget {
  #container: HTMLDivElement

  constructor(container: HTMLDivElement) {
    super()

    this.#container = container;

    window.addEventListener('resize', throttle(this.resize, 100))
  }

  resize = () => {
    this.dispatchEvent(new CanvasResizeEvent(this.#container.clientWidth, this.#container.clientHeight))
  }
}

export class CanvasResizeEvent extends Event {
  static readonly type = 'canvas:resize'

  constructor(public readonly width: number, public readonly height: number) {
    super(CanvasResizeEvent.type)
  }
}