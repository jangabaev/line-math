import type { Tool } from "../store/useCanvasStore.js";

export const findForStyleCursor=(cursor:Tool)=>{
    switch (cursor){
        case "hand":
            return "pointer"
            break
        case "pencil":
            return "crosshair"
            break
        default:
            "default"
            break
    }
}