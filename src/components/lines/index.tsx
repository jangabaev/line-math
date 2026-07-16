import { useEffect, useRef } from "react";
import { useCanvasStore } from "../../store/useCanvasStore.js";
import { worldToScreen } from "../../utils/camera.js";
import style from "./line.module.css";

const Lines = () => {
  const { lines, camera, startLine } = useCanvasStore((state) => state);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      ctx.lineWidth = line.width;
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
    <>
      <canvas ref={canvasRef} className={style.pen} />
    </>
  );
};

export default Lines;
