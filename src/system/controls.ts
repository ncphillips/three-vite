import { Camera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function createControls(camera: Camera, canvas: HTMLElement) {
  const controls = new OrbitControls(camera, canvas)

  controls.enableDamping = true

  return controls
}
