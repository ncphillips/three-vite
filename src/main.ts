import './style.css'
import {World} from "./system/World.ts";
import {createCube} from "./components/cube.ts";

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

world.onTick(() => {
  firstCube.rotation.x += 0.01
  firstCube.rotation.y += 0.01
})


world.start()

const playButton = document.querySelector('#play')
const pauseButton = document.querySelector('#pause')

playButton?.addEventListener('click', () => {
  world.start()
})

pauseButton?.addEventListener('click', () => {
  world.stop()
})