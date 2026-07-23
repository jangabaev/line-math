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
    designAll,
    setSelected,
    selected,
    setDrawing,
    setLineCreate,
    setLine,
    nodes,
    createNode,
  } = useCanvasStore((state) => state);

  const [isPanning, setIsPanning] = useState(false);
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
    if (cursor === "line") {
      setLine({
        id: draggingLineId.current,
        endX: e.clientX + camera.x,
        endY: e.clientY + camera.y,
      });
    }
    if (isPanning) {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      moveCamera({
        x: camera.x - dx,
        y: camera.y - dy,
        zoom: camera.zoom,
      });

      lastMouse.current = {
        x: e.clientX,
        y: e.clientY,
      };

      return;
    }
    if (cursor === "pencil") {
      return pencilMove({
        id: draggingLineId.current ?? "",
        x: e.clientX + camera.x,
        y: e.clientY + camera.y,
      });
    }

    if (cursor === "grab" && isPanning) {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      moveCamera({ x: camera.x - dx, y: camera.y - dy, zoom: camera.zoom });

      return (lastMouse.current = {
        x: e.clientX,
        y: e.clientY,
      });
    }

    if (cursor === "rectangle") {
      const p = screenToWorld(e.clientX, e.clientY, camera);
      moveNodes({
        id: draggingLineId.current,
        endX: p.x,
        endY: p.y,
      });
    }

    // ssd
    if (draggingNodeId.current === null) return;

    const updatedX = e.clientX - offset.current.x;
    const updatedY = e.clientY - offset.current.y;

    moveNodes({
      id: draggingNodeId.current,
      x: updatedX,
      y: updatedY,
      type: "circle",
    });
  };

  const hendleMouseDownOutside = (e: any) => {
    if (e.button === 1) {
      setIsPanning(true);
      setSelected(true);
      return (lastMouse.current = {
        x: e.clientX,
        y: e.clientY,
      });
    }

    if (cursor === "pencil") {
      const newId = uuidv4();
      const p = screenToWorld(e.clientX, e.clientY, camera);
      setDrawing(true);
      createPen({
        userId: 1,
        cordinate: [p],
        color: designAll.color,
        id: newId,
        width: designAll.width,
        opacity: designAll.opacity,
      });
      draggingLineId.current = newId;
    }

    if (cursor === "grab") {
      setIsPanning(true);
      setSelected(true);
      return (lastMouse.current = {
        x: e.clientX,
        y: e.clientY,
      });
    }

    if (cursor === "line") {
      const newId = uuidv4();
      const p = screenToWorld(e.clientX, e.clientY, camera);
      
      setLineCreate({
        id: newId,
        type: "line",
        x: p.x,
        y: p.y,
        endX: p.x,
        endY: p.y,
        pointCenter: [],
        color: designAll.color,
        opacity: designAll.opacity,
        pressure: designAll.pressure,
        width: designAll.width,
      });
      draggingLineId.current = newId;
    }

    if (cursor === "rectangle") {
      console.log(15);
      const newId = uuidv4();
      const p = screenToWorld(e.clientX, e.clientY, camera);
      createNode({
        type: "rectangle",
        id: newId,
        x: p.x,
        y: p.y,
        endX: p.x,
        endY: p.y,
        context: "",
        color: designAll.color,
        borderRadius: designAll.borderRadius,
        opacity: designAll.opacity,
        pressure: designAll.pressure,
        width: designAll.width,
      });
      draggingLineId.current = newId;
    }
  };

  const handleMouseUp = (e: any) => {
    console.log(e);
    setSelected(false);
    setDrawing(false);
    if (draggingLineId.current) {
      draggingLineId.current = null;
    }
    if (isPanning) {
      setIsPanning(false);
    }
  };
  return (
    <div
      className="canvas"
      style={{
        cursor: findForStyleCursor(selected ? "grabbing" : cursor),
      }}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseDown={(e) => hendleMouseDownOutside(e)}
      onMouseUp={(e) => handleMouseUp(e)}
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
