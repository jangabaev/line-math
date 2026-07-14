import { FaPen } from "react-icons/fa";

import style from "./pen.module.css";
import type { Tool } from "../../../../store/useCanvasStore.js";

interface IPen {
  changeCursor: (pen: Tool) => void;
}

const Pen = ({ changeCursor }: IPen) => {
  return (
    <div className={style.pen} onClick={() => changeCursor("pencil")}>
      <FaPen />
    </div>
  );
};

export default Pen;
