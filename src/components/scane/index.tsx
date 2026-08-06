import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCanvasStore } from "../../store/useCanvasStore.js";
import Nodes from "../nodes/index.js";
import Edges from "../edges/index.js";
import Lines from "../lines/index.js";
import { findForStyleCursor } from "../../utils/cursor.js";
import { screenToWorld, worldToScreen } from "../../utils/camera.js";
import { foundElement } from "../../utils/resizeElement.js";
import type { ResizeHandle } from "../../types/tools.js";
import { useKeyboardPress } from "../../hooks/keybordPress.js";

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
    deleteNodes,
  } = useCanvasStore((state) => state);
  const [cursorNode, setCursorNode] = useState("");
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<ResizeHandle>(null);

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
    if (e.button !== 0 && e.button !== 1) return;
    const newId = uuidv4();

    if (e.button === 0 && resizeHandle && selectedEl && cursor === "hand") {
      setIsResizing(true);
      setSelectedEl({
        ...selectedEl,
        move: false,
      });

      return;
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

    if (cursor === "circle") {
      const p = screenToWorld(e.clientX, e.clientY, camera);
      createNode({
        id: newId,
        type: "circle",
        x: p.x,
        y: p.y,
        endX: p.x,
        endY: p.y,
        color: designAll.color,
        opacity: designAll.opacity,
        pressure: designAll.pressure,
        width: designAll.width,
        background: designAll.background,
      });
      draggingLineId.current = newId;
    }
  };

  const handleMouseMove = (e: any) => {
    if (selectedEl && resizeHandle && isResizing) {
      const rect = e.currentTarget.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const world = screenToWorld(mouseX, mouseY, camera);

      resizeSelectedElement(world.x, world.y);
      return;
    }

    if (selectedEl?.move && !resizeHandle) {
      const dx = (e.clientX - lastMouse.current.x) / camera.zoom;
      const dy = (e.clientY - lastMouse.current.y) / camera.zoom;

      const updatedElement = {
        ...selectedEl,
        x: selectedEl.x + dx,
        y: selectedEl.y + dy,
        endX: selectedEl.endX + dx,
        endY: selectedEl.endY + dy,
      };

      moveNodes(updatedElement);
      setSelectedEl(updatedElement);

      lastMouse.current = {
        x: e.clientX,
        y: e.clientY,
      };

      return;
    }

    if (
      selectedEl?.id &&
      cursor === "hand" &&
      !selectedEl.move &&
      !isResizing
    ) {
      const rect = e.currentTarget.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const start = worldToScreen(selectedEl.x, selectedEl.y, camera);
      const end = worldToScreen(selectedEl.endX, selectedEl.endY, camera);

      const tolerance = 8;

      const left = Math.min(start.x, end.x);
      const right = Math.max(start.x, end.x);
      const top = Math.min(start.y, end.y);
      const bottom = Math.max(start.y, end.y);

      const nearLeft = Math.abs(mouseX - left) <= tolerance;
      const nearRight = Math.abs(mouseX - right) <= tolerance;
      const nearTop = Math.abs(mouseY - top) <= tolerance;
      const nearBottom = Math.abs(mouseY - bottom) <= tolerance;

      const insideHorizontal =
        mouseX >= left - tolerance && mouseX <= right + tolerance;

      const insideVertical =
        mouseY >= top - tolerance && mouseY <= bottom + tolerance;

      if (nearLeft && nearTop) {
        setResizeHandle("top-left");
        setCursorNode("nwse-resize");
        return;
      }

      if (nearRight && nearTop) {
        setResizeHandle("top-right");
        setCursorNode("nesw-resize");
        return;
      }

      if (nearLeft && nearBottom) {
        setResizeHandle("bottom-left");
        setCursorNode("nesw-resize");
        return;
      }

      if (nearRight && nearBottom) {
        setResizeHandle("bottom-right");
        setCursorNode("nwse-resize");
        return;
      }

      if (nearTop && insideHorizontal) {
        setResizeHandle("top");
        setCursorNode("ns-resize");
        return;
      }

      if (nearBottom && insideHorizontal) {
        setResizeHandle("bottom");
        setCursorNode("ns-resize");
        return;
      }

      if (nearLeft && insideVertical) {
        setResizeHandle("left");
        setCursorNode("ew-resize");
        return;
      }

      if (nearRight && insideVertical) {
        setResizeHandle("right");
        setCursorNode("ew-resize");
        return;
      }

      setResizeHandle(null);
      setCursorNode("");
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

    if (cursor === "circle") {
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
    setSelected(false);
    setDrawing(false);
    setIsResizing(false);
    setResizeHandle(null);
    setCursorNode("");

    if (selectedEl) {
      setSelectedEl({
        ...selectedEl,
        move: false,
      });
    }

    draggingLineId.current = null;
    draggingNodeId.current = null;
    setIsPanning(false);
  };

  const resizeSelectedElement = (worldX: number, worldY: number) => {
    if (!selectedEl || !resizeHandle) return;

    let x = selectedEl.x;
    let y = selectedEl.y;
    let endX = selectedEl.endX;
    let endY = selectedEl.endY;

    switch (resizeHandle) {
      case "top":
        y = worldY;
        break;

      case "bottom":
        endY = worldY;
        break;

      case "left":
        x = worldX;
        break;

      case "right":
        endX = worldX;
        break;

      case "top-left":
        x = worldX;
        y = worldY;
        break;

      case "top-right":
        endX = worldX;
        y = worldY;
        break;

      case "bottom-left":
        x = worldX;
        endY = worldY;
        break;

      case "bottom-right":
        endX = worldX;
        endY = worldY;
        break;
    }

    moveNodes({
      id: selectedEl.id,
      type: selectedEl.type,
      x,
      y,
      endX,
      endY,
    });

    setSelectedEl({
      ...selectedEl,
      x,
      y,
      endX,
      endY,
      move: false,
    });
  };

  useKeyboardPress({ deleteNodes, selectedEl, setSelectedEl });

  return (
    <div
      className="canvas"
      style={{
        cursor:
          selectedEl && cursorNode && resizeHandle
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
