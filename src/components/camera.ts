import {PerspectiveCamera} from "three";
import {CanvasResizeEvent, Canvas} from "../system/Canvas.ts";

export function createCamera(resizer: Canvas) {
  let camera = new PerspectiveCamera(
    35,
    1,
    0.1,
    100
  );

  camera.position.set(0, 0, 10);

  resizer.addEventListener(CanvasResizeEvent.type, (event) => {
    if (!(event instanceof CanvasResizeEvent)) return

    camera.aspect = event.width / event.height

    camera.updateProjectionMatrix();
  })

  return camera
}