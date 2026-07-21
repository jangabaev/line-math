import { FaPen } from "react-icons/fa";

import style from "./pen.module.css";
import { useCanvasStore } from "../../../../store/useCanvasStore.js";

const Pen = () => {
  const {changeCursor,cursor}=useCanvasStore((state)=>state)
  return (
    <div className={cursor==="pencil"?"active":style.pen} onClick={()=>changeCursor("pencil")}>
      <FaPen />
    </div>
  );
};

export default Pen;
