import './style.css'
import { World } from './system/World.ts'
import { createCube } from './components/cube.ts'
import {
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
} from 'three'

const container = document.querySelector<HTMLDivElement>('#scene-container')

if (!container) {
  throw new Error("Where's the container?")
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

const sphere = new Mesh(
  new SphereGeometry(0.25, 16, 16),
  new MeshStandardMaterial({ color: 'indigo' })
)

sphere.position.set(0, 0, 0)

const group = new Group()
group.position.set(0, 3, 0)
group.scale.multiplyScalar(2)
group.rotation.y = MathUtils.degToRad(45)
for (let i = 0; i < 1; i += 0.001) {
  const cloneSphere = sphere.clone()
  cloneSphere.position.x += Math.cos(2 * Math.PI * i)
  cloneSphere.position.y += Math.sin(2 * Math.PI * i)
  sphere.position.z = -i * 5
  cloneSphere.scale.multiplyScalar(0.01 + i)
  group.add(cloneSphere)
}
world.add(group)
world.onTick((e) => {
  group.rotation.z -= MathUtils.degToRad(30) * e.delta
})
