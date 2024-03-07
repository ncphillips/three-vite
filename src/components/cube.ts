import { BoxGeometry, Mesh, MeshStandardMaterial, TextureLoader } from 'three'

export function createCube() {
  const geometry = new BoxGeometry(2, 2, 2)
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load('/assets/textures/uv-test-bw.png')
  const material = new MeshStandardMaterial({
    map: texture,
  })

  return new Mesh(geometry, material)
}
