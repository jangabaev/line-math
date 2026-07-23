import { BiRectangle } from "react-icons/bi";

import style from "./rectangle.module.css";
import type { Tool } from "../../../../types/index.js";
import { useCanvasStore } from "../../../../store/useCanvasStore.js";

const Rectangle = () => {
  const { changeCursor, cursor } = useCanvasStore((state) => state);
  return (
    <div
      onClick={() => changeCursor("rectangle")}
      className={`${cursor === "rectangle" && "active"} panel_cursor`}
    >
      <BiRectangle />
    </div>
  );
};

export default Rectangle;
