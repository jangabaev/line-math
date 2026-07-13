import { useState, useRef, useEffect } from "react";
import { type Edge, type Node } from "./types/index.js";
import { useCanvasStore } from "./store/useCanvasStore.js";
import Panel from "./components/panel/index.js";
import { v4 as uuidv4 } from "uuid";
import { worldToScreen } from "./utils/camera.js";
import { findForStyleCursor } from "./utils/cursor.js";
import Nodes from "./components/nodes/index.js";

function App() {
  const {
    nodes,
    edges,
    createNode,
    moveNodes,
    cursor,
    createPen,
    pencilMove,
    lines,
    camera,
    moveCamera,
  } = useCanvasStore((state) => state);
  console.log(camera);

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
        x: e.clientX,
        y: e.clientY,
      });
    }

    if (cursor === "hand" && isPanning) {
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
    }

    if (draggingNodeId.current === null) return;

    const updatedX = (e.clientX + camera.x) / camera.zoom;
    const updatedY = (e.clientY + camera.y) / camera.zoom;

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
      createPen({
        userId: 1,
        cordinate: [{ x: e.clientX, y: e.clientY }],
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
  }, [lines]);

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

      ctx.moveTo(line.cordinate[0].x, line.cordinate[0].y);

      for (let i = 1; i < line.cordinate.length; i++) {
        ctx.lineTo(line.cordinate[i].x, line.cordinate[i].y);
      }

      ctx.stroke();
    }
  };
  return (
    <main>
      <div
        className="canvas"
        style={{
          transform: `translate(${-camera.x}px, ${-camera.y}px) scale(${camera.zoom})`,
          transformOrigin: "0 0",
          cursor: findForStyleCursor(cursor),
        }}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseDown={(e) => hendleMouseDownOutside(e)}
        onClick={(e) => clickOutside(e)}
      >
        <Nodes draggingNodeId={draggingNodeId} />
        <svg className="svg" xmlns="http://www.w3.org/2000/svg">
          {edges.map((el) => {
            const from = nodes.find((n) => n.id === el.from) || { x: 0, y: 0 };
            const to = nodes.find((n) => n.id === el.to) || { x: 0, y: 0 };

            const p1 = worldToScreen(
              from.x + cirlceRaduis / 2,
              from.y + cirlceRaduis / 2,
              camera,
            );
            const p2 = worldToScreen(
              to.x + cirlceRaduis / 2,
              to.y + cirlceRaduis / 2,
              camera,
            );
            return (
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                className="stroke"
              />
            );
          })}
        </svg>

        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          className="canvas"
        />
      </div>
      <Panel />
    </main>
  );
}

export default App;
