import type { Tool } from "../types/index.js";

export const findForStyleCursor = (cursor: Tool) => {
  switch (cursor) {
    case "hand":
      return "auto";
      break;
    case "pencil":
      return "crosshair";
      break;
    case "triangle":
      return "crosshair";
      break;
    case "rectangle":
      return "crosshair";
      break;
    case "line":
      return "crosshair";
      break;
    case "grab":
      return "grab";
      break;
    case "grabbing":
      return "grabbing";
      break;
    case "ew-resize":
      return "ew-resize";
      break
    case "ns-resize":
      return "ns-resize"
      break
    case "nwse-resize":
      return "nwse-resize"
      break
    case "nesw-resize":
      return "nesw-resize"
      break
    default:
      "default";
      break;
  }
};

