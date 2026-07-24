type ResizeCursor =
  | "nwse-resize"
  | "nesw-resize"
  | "ns-resize"
  | "ew-resize";

type ResizeHandle = {
  x: number;
  y: number;
  cursor: ResizeCursor;
};

export const getResizeHandles = (
  x: number,
  y: number,
  width: number,
  height: number,
): ResizeHandle[] => {
  const padding = 6;

  const left = x - padding;
  const right = x + width + padding;
  const top = y - padding;
  const bottom = y + height + padding;

  const centerX = x + width / 2;
  const centerY = y + height / 2;

  return [
    // Burchaklar
    { x: left, y: top, cursor: "nwse-resize" },
    { x: right, y: top, cursor: "nesw-resize" },
    { x: left, y: bottom, cursor: "nesw-resize" },
    { x: right, y: bottom, cursor: "nwse-resize" },

    // Yon tomonlar
    { x: centerX, y: top, cursor: "ns-resize" },
    { x: centerX, y: bottom, cursor: "ns-resize" },
    { x: left, y: centerY, cursor: "ew-resize" },
    { x: right, y: centerY, cursor: "ew-resize" },
  ];
};