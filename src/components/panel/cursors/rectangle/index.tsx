import { BiRectangle } from "react-icons/bi";

import style from "./rectangle.module.css";
import type { Tool } from "../../../../types/index.js";
import { useCanvasStore } from "../../../../store/useCanvasStore.js";


const Rectangle = () => {
  const {changeCursor,cursor}=useCanvasStore((state)=>state)
  return (
    <div className={style.pen} onClick={() => changeCursor("rectangle")}>
      <BiRectangle />
    </div>
  );
};

export default Rectangle;
