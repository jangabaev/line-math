import { useCallback, useEffect, useRef } from "react";
import { useCanvasStore } from "../../store/useCanvasStore.js";
import { worldToScreen } from "../../utils/camera.js";
import style from "./line.module.css";

const Lines = () => {
  const { lines, camera, nodes } = useCanvasStore((state) => state);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pencil chiziqlari
    for (const line of lines) {
      if (line.cordinate.length < 2) continue;

      const firstPoint = line.cordinate[0];

      if (!firstPoint) continue;

      const first = worldToScreen(firstPoint.x, firstPoint.y, camera);

      ctx.save();

      ctx.beginPath();
      ctx.moveTo(first.x, first.y);

      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width;
      ctx.globalAlpha = line.opacity;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < line.cordinate.length; i++) {
        const point = line.cordinate[i];

        if (!point) continue;

        const screenPoint = worldToScreen(point.x, point.y, camera);

        ctx.lineTo(screenPoint.x, screenPoint.y);
      }

      ctx.stroke();
      ctx.restore();
    }

    // To‘g‘ri chiziqlar
    for (const node of nodes) {
      if (node.type !== "line") continue;

      const start = worldToScreen(node.x, node.y, camera);

      const end = worldToScreen(node.endX, node.endY, camera);

      ctx.save();

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);

      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.globalAlpha = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.stroke();
      ctx.restore();
    }
  }, [lines, nodes, camera]);

  useEffect(() => {
    draw();
  }, [draw]);

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
  }, [draw]);

  return <canvas ref={canvasRef} className={style.pen} />;
};

export default Lines;
