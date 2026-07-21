import { FaRegHandPaper } from "react-icons/fa";
import { type Tool } from "../../../../types/index.js";
import style from "./line.module.css";
import { useCanvasStore } from "../../../../store/useCanvasStore.js";

const Line = () => {
  const {changeCursor,cursor}=useCanvasStore((state)=>state)
  return (
    <div onClick={() => changeCursor("line")}>
      <div className={style.line}></div>
    </div>
  );
};

export default Line;
