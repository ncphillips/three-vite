import './style.css'
import { World } from './system/World.ts'
import { createCube } from './components/cube.ts'
import { Color, MathUtils } from 'three'
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

let moveDirection: 'left' | 'right' = 'right'
world.onTick(function secondCubeMoves(e) {
  if (secondCube.position.x > 10) moveDirection = 'left'
  if (secondCube.position.x < 1) moveDirection = 'right'

  const moveDistance = e.delta * 1
  if (moveDirection === 'left') {
    secondCube.position.x -= moveDistance
  } else {
    secondCube.position.x += moveDistance
  }
})
world.onTick(function secondCubeChangesColor() {
  const distance = secondCube.position.distanceTo(firstCube.position)
  console.log('Distance', distance)
  if (distance >= 5.5) {
    secondCube.material.color = new Color('pink')
  } else {
    secondCube.material.color = new Color('blue')
  }
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
speedInput?.addEventListener('input', (event) => {
  const target = event.target as HTMLInputElement
  world.speed = parseFloat(target.value)
})

const playButton = document.querySelector('#play')
playButton?.addEventListener('click', () => {
  world.start()
})

const pauseButton = document.querySelector('#pause')
pauseButton?.addEventListener('click', () => {
  world.stop()
})

const toggleDebugButton = document.querySelector('#toggle-debug')
if (toggleDebugButton) {
  toggleDebugButton.addEventListener('click', () => {
    if (toggleDebugButton.getAttribute('data-debug') === 'on') {
      world.debug = false
      toggleDebugButton.setAttribute('data-debug', 'off')
      toggleDebugButton.textContent = 'Enable Debug'
    } else {
      world.debug = true
      toggleDebugButton.setAttribute('data-debug', 'on')
      toggleDebugButton.textContent = 'Disable Debug'
    }
  })
}
