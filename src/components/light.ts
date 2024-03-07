import { DirectionalLight, HemisphereLight, Light } from 'three'

export function createLights(): Light[] {
  const hemisphereLight = new HemisphereLight('white', 'gray', 2)

  const mainLight = new DirectionalLight('white', 5)
  mainLight.position.set(10, 10, 10)

  return [mainLight, hemisphereLight]
}
