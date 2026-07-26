import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCanvasStore } from "../../store/useCanvasStore.js";
import Nodes from "../nodes/index.js";
import Edges from "../edges/index.js";
import Lines from "../lines/index.js";
import { findForStyleCursor } from "../../utils/cursor.js";
import { screenToWorld, worldToScreen } from "../../utils/camera.js";
import { foundElement } from "../../utils/resizeElement.js";

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
    selectedEl,
    setSelectedEl,
  } = useCanvasStore((state) => state);
  const [cursorNode, setCursorNode] = useState("");
  const [resize, setResize] = useState("");

  const [isPanning, setIsPanning] = useState(false);
  const draggingNodeId = useRef<number | null>(null);

  const draggingLineId = useRef<string | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  const lastMouse = useRef({
    x: 0,
    y: 0,
  });
  const cirlceRaduis = 50;

  const hendleMouseDown = (e: any) => {
    if (cursorNode && selectedEl && cursor === "hand") {
      setResize(cursorNode);
    }

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
        type: "pencil",
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

    if (cursor === "hand") {
      foundElement({ e, camera, lastMouse, nodes, setSelectedEl });
    }
  };

  const handleMouseMove = (e: any) => {
    if (selectedEl && resize) {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      const world = screenToWorld(e.clientX, e.clientY, camera);
      console.log(12);
      moveNodes({
        ...selectedEl,
        endX: world.x,
        endY: world.y,
      });
    }

    if (selectedEl && selectedEl.move) {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      moveNodes({
        ...selectedEl,
        x: selectedEl.x + dx,
        y: selectedEl.y + dy,
        endX: selectedEl.endX + dx,
        endY: selectedEl.endY + dy,
      });
    }

    if (selectedEl?.id && cursor === "hand") {
      const rect = e.currentTarget.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const start = worldToScreen(selectedEl.x, selectedEl.y, camera);

      const end = worldToScreen(selectedEl.endX, selectedEl.endY, camera);

      const padding = 6;
      const tolerance = 6;

      const left = Math.min(start.x, end.x) - padding;
      const right = Math.max(start.x, end.x) + padding;
      const top = Math.min(start.y, end.y) - padding;
      const bottom = Math.max(start.y, end.y) + padding;

      const nearLeft = Math.abs(mouseX - left) <= tolerance;
      const nearRight = Math.abs(mouseX - right) <= tolerance;
      const nearTop = Math.abs(mouseY - top) <= tolerance;
      const nearBottom = Math.abs(mouseY - bottom) <= tolerance;

      const insideHorizontal = mouseX >= left && mouseX <= right;
      const insideVertical = mouseY >= top && mouseY <= bottom;

      // Burchaklar
      if ((nearLeft && nearTop) || (nearRight && nearBottom)) {
        setCursorNode("nwse-resize");
        return;
      }

      if ((nearRight && nearTop) || (nearLeft && nearBottom)) {
        setCursorNode("nesw-resize");
        return;
      }

      // Yuqori va pastki chiziq
      if ((nearTop || nearBottom) && insideHorizontal) {
        setCursorNode("ns-resize");
        return;
      }

      // Chap va o‘ng chiziq
      if ((nearLeft || nearRight) && insideVertical) {
        setCursorNode("ew-resize");
        return;
      }

      return setCursorNode("");
    }

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

  const handleMouseUp = (e: any) => {
    console.log(e);
    setSelected(false);
    setDrawing(false);
    setResize("");
    setSelectedEl({ ...selectedEl, move: false });
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
        cursor:
          selectedEl && cursorNode
            ? cursorNode
            : findForStyleCursor(selected ? "grabbing" : cursor),
      }}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseDown={(e) => hendleMouseDown(e)}
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
