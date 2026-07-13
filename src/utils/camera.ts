import { type Camera } from "../types/index.js";

export function worldToScreen(x: number, y: number, camera: Camera) {
  return {
    x: x * camera.zoom,
    y: y * camera.zoom,
  };
}

export function screenToWorld(x: number, y: number, camera: Camera) {
  return {
    x: x / camera.zoom + camera.x,
    y: y / camera.zoom + camera.y,
  };
}
