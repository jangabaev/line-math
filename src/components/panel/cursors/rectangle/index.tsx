import { BiRectangle } from "react-icons/bi";

import style from "./rectangle.module.css";
import type { Tool } from "../../../../types/index.js";

interface IPen {
  changeCursor: (pen: Tool) => void;
}

const Rectangle = ({ changeCursor }: IPen) => {
  return (
    <div className={style.pen} onClick={() => changeCursor("rectangle")}>
      <BiRectangle />
    </div>
  );
};

export default Rectangle;
