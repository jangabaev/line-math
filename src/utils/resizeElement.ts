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
  e: React.MouseEvent<HTMLDivElement>;
  camera: Camera;
  lastMouse: React.MutableRefObject<{
    x: number;
    y: number;
  }>;
  nodes: Node[];
  setSelectedEl: (node: Node | null) => void;
}) => {
  const rect = e.currentTarget.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const world = screenToWorld(mouseX, mouseY, camera);

  for (const node of [...nodes].reverse()) {
    const left = Math.min(node.x, node.endX);
    const right = Math.max(node.x, node.endX);
    const top = Math.min(node.y, node.endY);
    const bottom = Math.max(node.y, node.endY);

    if (
      node.type === "rectangle" &&
      world.x >= left &&
      world.x <= right &&
      world.y >= top &&
      world.y <= bottom
    ) {
      lastMouse.current = {
        x: e.clientX,
        y: e.clientY,
      };

      setSelectedEl({
        ...node,
        move: true,
      });

      return;
    }
  }

  setSelectedEl(null);
};
