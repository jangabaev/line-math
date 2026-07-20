import type { Tool } from "../types/index.js";

export const findForStyleCursor = (cursor: Tool) => {
  switch (cursor) {
    case "hand":
      return "pointer";
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
    default:
      "default";
      break;
  }
};
