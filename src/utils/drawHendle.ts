const size = 8;

export function drawHandle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  ctx.save();

  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#181717";
  ctx.shadowBlur
  ctx.lineWidth = 1.5;

  ctx.beginPath();

  ctx.roundRect(
    x - size / 2,
    y - size / 2,
    size,
    size,
    1
  );

  ctx.fill();   
  ctx.stroke();

  ctx.restore();
}