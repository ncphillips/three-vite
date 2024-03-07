import './style.css'
import { World } from './system/World.ts'
import { createCube } from './components/cube.ts'
import { MathUtils } from 'three'
import { createSpiral } from './components/spiral.ts'

/**
 * Create the World
 */
const container = document.querySelector<HTMLDivElement>('#scene-container')!
const world = new World(container)

/**
 * Create Objects
 */
const firstCube = createCube()
const secondCube = firstCube.clone()
const spiral = createSpiral()

/**
 * Position Objects
 */
firstCube.position.set(-1.5, 0, 0)
secondCube.position.set(1.5, 0, 0)
spiral.position.set(0, 4, 0)

/**
 * Add Objects to the World
 */
world.add(firstCube, secondCube, spiral)

/**
 * Give the Objects Behaviour
 */
world.onTick(function firstCubeRotests(event) {
  const radsPerSecond = MathUtils.degToRad(30)
  firstCube.rotation.x += event.delta * radsPerSecond
  firstCube.rotation.y += event.delta * radsPerSecond
})

world.onTick(function spiralSpins(e) {
  spiral.rotation.z -= MathUtils.degToRad(30) * e.delta
})

/**
 * Start the World
 */
world.start()

/**
 * Controls
 */
const speedInput = document.querySelector<HTMLInputElement>('#speed')
const playButton = document.querySelector('#play')
const pauseButton = document.querySelector('#pause')

speedInput?.addEventListener('input', (event) => {
  const target = event.target as HTMLInputElement
  world.speed = parseFloat(target.value)
})

playButton?.addEventListener('click', () => {
  world.start()
})

pauseButton?.addEventListener('click', () => {
  world.stop()
})
