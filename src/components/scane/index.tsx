import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useCanvasStore } from "../../store/useCanvasStore.js";
import Nodes from "../nodes/index.js";
import Edges from "../edges/index.js";
import type { Node } from "../../types/index.js";
import { findForStyleCursor } from "../../utils/cursor.js";
import { screenToWorld, worldToScreen } from "../../utils/camera.js";

const Scane = () => {
  const {
    moveNodes,
    cursor,
    createPen,
    pencilMove,
    lines,
    camera,
    moveCamera,
  } = useCanvasStore((state) => state);

  const [isPanning, setIsPanning] = useState(false);

  const lastPoint = useRef({
    x: 0,
    y: 0,
  });

  console.log(lastPoint.current);
  const draggingNodeId = useRef<number | null>(null);

  const draggingLineId = useRef<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  const lastMouse = useRef({
    x: 0,
    y: 0,
  });
  const radius = 400;
  const cirlceRaduis = 50;

  const handleMouseDown = (node: Node, e: any) => {
    if (e.target !== e.currentTarget) return;

    if (cursor === "pencil") {
    }

    setIsPanning(true);

    lastPoint.current = {
      x: e.clientX,
      y: e.clientY,
    };

    if (draggingNodeId.current) {
      return (draggingNodeId.current = null);
    }

    e.stopPropagation(); // Hodisa boshqa elementlarga o'tib ketmasligi uchun
    draggingNodeId.current = node.id;

    // Sichqoncha nodening aynan qayeridan bosilganini aniqlash
    offset.current = {
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    };
  };

  const handleMouseMove = (e: any) => {
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
    if (draggingLineId.current) {
      draggingLineId.current = null;
    }
    if (isPanning) {
      setIsPanning(false);
    }
  };

  const hendleMouseDownOutside = (e: any) => {
    console.log(e);

    if (cursor === "pencil") {
      const newId = uuidv4();
      const p = screenToWorld(e.clientX, e.clientY, camera);
      createPen({
        userId: 1,
        cordinate: [p],
        color: "red",
        id: newId,
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

  useEffect(() => {
    draw();
  }, [lines, camera]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      draw();
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const line of lines) {
      if (line.cordinate.length < 2) continue;

      ctx.beginPath();

      ctx.strokeStyle = line.color;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const first = worldToScreen(
        line.cordinate[0].x,
        line.cordinate[0].y,
        camera,
      );

      ctx.moveTo(first.x, first.y);

      for (let i = 1; i < line.cordinate.length; i++) {
        const p = worldToScreen(
          line.cordinate[i].x,
          line.cordinate[i].y,
          camera,
        );

        ctx.lineTo(p.x, p.y);
      }

      ctx.stroke();
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
      <canvas ref={canvasRef} className="pen-canvas" />
    </div>
  );
};

export default Scane;
