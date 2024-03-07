import './style.css'
import {World} from "./World.ts";
import {createCube} from "./components/cube.ts";

const container = document.querySelector<HTMLDivElement>('#scene-container');

if (!container) {
  throw new Error("Where's the container?");
}

const world = new World(container)


const cube = createCube()

world.add(cube)

setInterval(() => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
}, 1000 / 60)
