import './style.css'
import {World} from "./system/World.ts";
import {createCube} from "./components/cube.ts";
import {MathUtils} from "three";

const container = document.querySelector<HTMLDivElement>('#scene-container');

if (!container) {
  throw new Error("Where's the container?");
}

const world = new World(container)


const firstCube = createCube()
firstCube.position.set(-1.5, 0, 0)

const secondCube = firstCube.clone()
secondCube.position.set(1.5, 0, 0)

world.add(firstCube, secondCube)

world.onTick((event) => {
  const radsPerSecond = MathUtils.degToRad(30)
  firstCube.rotation.x += event.delta * radsPerSecond
  firstCube.rotation.y += event.delta * radsPerSecond
})


world.start()

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

