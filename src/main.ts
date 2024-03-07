import './style.css'
import {World} from "./system/World.ts";
import {createCube} from "./components/cube.ts";

const container = document.querySelector<HTMLDivElement>('#scene-container');

if (!container) {
  throw new Error("Where's the container?");
}

const world = new World(container)


const cube = createCube()

world.add(cube)

world.onTick(() => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
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