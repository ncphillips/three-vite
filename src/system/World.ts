import { Object3D, PerspectiveCamera, Scene } from 'three'

// System
import { Canvas } from './Canvas.ts'
import { RenderLoop, RenderEvent } from './RenderLoop.ts'

// Components
import { createCamera } from '../components/camera.ts'
import { createLight } from '../components/light.ts'
import { createScene } from '../components/scene.ts'
import { createControls } from './controls.ts'

export class World extends EventTarget {
  #camera: PerspectiveCamera
  #scene: Scene
  #renderLoop: RenderLoop
  #container: HTMLDivElement

  constructor(container: HTMLDivElement) {
    super()
    const canvas = new Canvas(container)

    this.#container = container

    this.#camera = createCamera(canvas)

    this.#scene = createScene()
    this.#scene.add(createLight())

    this.#renderLoop = new RenderLoop(this.#scene, this.#camera, canvas)

    this.#container.append(this.#renderLoop.domElement)

    this.#renderLoop.addEventListener(RenderEvent.type, this.tick)

    const controls = createControls(this.#camera, this.#renderLoop.domElement)

    canvas.resize()
  }

  get speed() {
    return this.#renderLoop.speed
  }

  set speed(speed: number) {
    this.#renderLoop.speed = speed
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

  onTick(callback: (event: RenderEvent) => void) {
    // @ts-ignore
    this.addEventListener(WorldTickEvent.type, callback)
  }

  private tick = (renderEvent: Event) => {
    if (!(renderEvent instanceof RenderEvent)) return

    this.dispatchEvent(new WorldTickEvent(renderEvent.delta))
  }
}

export class WorldTickEvent extends Event {
  static readonly type = 'world:tick'

  constructor(public readonly delta: number) {
    super(WorldTickEvent.type)
  }
}
