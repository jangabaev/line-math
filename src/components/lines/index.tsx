import { useCallback, useEffect, useRef } from "react";
import { useCanvasStore } from "../../store/useCanvasStore.js";
import { screenToWorld, worldToScreen } from "../../utils/camera.js";
import style from "./line.module.css";
import { drawHandle } from "../../utils/drawHendle.js";

const Lines = () => {
  const { lines, camera, nodes, setSelectedEl, selectedEl } = useCanvasStore(
    (state) => state,
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pencil chiziqlari
    for (const line of lines) {
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
      if (node.type == "line") {
        const start = worldToScreen(node.x, node.y, camera);

        const end = worldToScreen(node.endX, node.endY, camera);

        ctx.save();

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);

        ctx.strokeStyle = node.color ?? "black";
        ctx.lineWidth = node.width ?? 3;
        ctx.globalAlpha = node.opacity ?? 1;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.stroke();
        ctx.restore();
      } else if (node.type === "rectangle") {
        const start = worldToScreen(node.x, node.y, camera);
        const end = worldToScreen(node.endX, node.endY, camera);

        if (selectedEl && node.id === selectedEl.id) {
          drawSelection(
            ctx,
            start.x,
            start.y,
            Math.abs(start.x - end.x),
            Math.abs(start.y - end.y),
          );
        }

        const x = Math.min(start.x, end.x);
        const y = Math.min(start.y, end.y);
        const width = Math.abs(end.x - start.x);
        const height = Math.abs(end.y - start.y);

        const radius = node.borderRadius ?? 12;

        ctx.save();
        ctx.beginPath();

        ctx.roundRect(x, y, width, height, radius);

        ctx.strokeStyle = node.color ?? "black";
        ctx.lineWidth = node.width ?? 3;
        ctx.globalAlpha = node.opacity ?? 1;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.stroke();
        ctx.restore();
      }
    }
  }, [lines, nodes, camera, selectedEl]);

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

  const drawSelection = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    const padding = 8;

    const left = x - padding;
    const right = x + width + padding;
    const top = y - padding;
    const bottom = y + height + padding;

    const centerX = x + width / 2;
    const centerY = y + height / 2;

    ctx.save();

    ctx.strokeStyle = "#2e2e30";
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 3]);

    ctx.strokeRect(left, top, width + padding * 2, height + padding * 2);

    ctx.restore();

    // Tepada
    drawHandle(ctx, left, top);
    drawHandle(ctx, centerX, top);
    drawHandle(ctx, right, top);

    // Chap va o‘ng tomonda
    drawHandle(ctx, left, centerY);
    drawHandle(ctx, right, centerY);

    // Pastda
    drawHandle(ctx, left, bottom);
    drawHandle(ctx, centerX, bottom);
    drawHandle(ctx, right, bottom);
  };

  return <canvas ref={canvasRef} className={style.pen} />;
};

export default Lines;
