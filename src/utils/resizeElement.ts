import type { Camera } from "../types/camera.js";
import type { Node } from "../types/nodes.js";
import { screenToWorld } from "./camera.js";

export const foundElement = ({
  e,
  camera,
  lastMouse,
  nodes,
  setSelectedEl,
}: {
  e: any;
  camera: Camera;
  lastMouse: React.RefObject<{
    x: number;
    y: number;
  }>;
  nodes: Node[];
  setSelectedEl: (e: any) => void;
}) => {
  const rect = e.currentTarget.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const world = screenToWorld(mouseX, mouseY, camera);
  lastMouse.current = { x: mouseX, y: mouseY };
  for (const node of nodes) {
    if (
      node.type === "rectangle" &&
      world.x >= node.x &&
      world.x <= node.endX &&
      world.y >= node.y &&
      world.y <= node.endY
    ) {
      console.log(node);
      return setSelectedEl({ ...node, move: true });
    }
  }
  // if (!resize && !selectedEl) {
  return setSelectedEl(null);
};
