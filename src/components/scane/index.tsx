import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useCanvasStore } from "../../store/useCanvasStore.js";
import Nodes from "../nodes/index.js";
import Edges from "../edges/index.js";
import Lines from "../lines/index.js";
import type { Node } from "../../types/index.js";
import { findForStyleCursor } from "../../utils/cursor.js";
import { screenToWorld, worldToScreen } from "../../utils/camera.js";

const Scane = () => {
  const {
    moveNodes,
    cursor,
    createPen,
    pencilMove,
    camera,
    moveCamera,
    startLine,
  } = useCanvasStore((state) => state);

  const [isPanning, setIsPanning] = useState(false);

  const lastPoint = useRef({
    x: 0,
    y: 0,
  });

  // console.log(lastPoint.current);
  const draggingNodeId = useRef<number | null>(null);

  const draggingLineId = useRef<string | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  const lastMouse = useRef({
    x: 0,
    y: 0,
  });
  const radius = 400;
  const cirlceRaduis = 50;

  const handleMouseMove = (e: any) => {
    if (e.buttons === 4) {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      moveCamera({ x: camera.x - dx, y: camera.y - dy, zoom: camera.zoom });

      return (lastMouse.current = {
        x: e.clientX,
        y: e.clientY,
      });
    }
    if (cursor === "pencil") {
      return pencilMove({
        id: draggingLineId.current ?? "",
        x: e.clientX + camera.x,
        y: e.clientY + camera.y,
      });
    }

    if (cursor === "hand" && isPanning) {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      moveCamera({ x: camera.x - dx, y: camera.y - dy, zoom: camera.zoom });

      lastMouse.current = {
        x: e.clientX,
        y: e.clientY,
      };
    }
    // ssd
    if (draggingNodeId.current === null) return;

    const updatedX = e.clientX - offset.current.x;
    const updatedY = e.clientY - offset.current.y;

    moveNodes({
      id: draggingNodeId.current,
      x: updatedX,
      y: updatedY,
    });
  };

  const clickOutside = (e: any) => {
    console.log(e);
    if (draggingLineId.current) {
      draggingLineId.current = null;
    }
    if (isPanning) {
      setIsPanning(false);
    }
  };

  const hendleMouseDownOutside = (e: any) => {
    // console.log(e);
    if (e.button === 1) {
      setIsPanning(true);
      return (lastMouse.current = {
        x: e.clientX,
        y: e.clientY,
      });
    }

    if (cursor === "pencil") {
      const newId = uuidv4();
      const p = screenToWorld(e.clientX, e.clientY, camera);
      createPen({
        userId: 1,
        cordinate: [p],
        color: startLine.color,
        id: newId,
        width: startLine.width,
      });
      draggingLineId.current = newId;
    }

    if (cursor === "hand") {
      setIsPanning(true);
      lastMouse.current = {
        x: e.clientX,
        y: e.clientY,
      };
    }
  };

  return (
    <div
      className="canvas"
      style={{
        cursor: findForStyleCursor(cursor),
      }}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseDown={(e) => hendleMouseDownOutside(e)}
      onClick={(e) => clickOutside(e)}
    >
      {/* bul deneler */}
      <Nodes draggingNodeId={draggingNodeId} />

      {/* bul siziqlar */}
      <Edges cirlceRaduis={cirlceRaduis} />

      {/* for pen */}
      <Lines />
    </div>
  );
};

export default Scane;
