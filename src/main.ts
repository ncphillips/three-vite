import './style.css'
import {World} from "./World.ts";

const container = document.querySelector<HTMLDivElement>('#scene-container');

if (!container) {
  throw new Error("Where's the container?");
}

const world = new World(container)

let startButton = document.getElementById("start");

if (!startButton) {
  throw new Error("Where's the button?");
}

startButton.addEventListener("click", () => {
  world.render();
})
