import {
  Mesh,
  SphereGeometry,
  MeshStandardMaterial,
  Group,
  MathUtils,
} from 'three'

export function createSpiral() {
  const sphere = new Mesh(
    new SphereGeometry(0.25, 16, 16),
    new MeshStandardMaterial({ color: 'indigo' })
  )

  sphere.position.set(0, 0, 0)

  const group = new Group()
  group.position.set(0, 3, 0)
  group.scale.multiplyScalar(2)
  group.rotation.y = MathUtils.degToRad(45)

  for (let i = 0; i < 1; i += 0.1) {
    const cloneSphere = sphere.clone()
    cloneSphere.position.x += Math.cos(2 * Math.PI * i)
    cloneSphere.position.y += Math.sin(2 * Math.PI * i)
    sphere.position.z = -i * 5
    cloneSphere.scale.multiplyScalar(0.01 + i)
    group.add(cloneSphere)
  }

  return group
}
