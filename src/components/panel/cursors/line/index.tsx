import { FaRegHandPaper } from "react-icons/fa";
import { type Tool } from "../../../../types/index.js";
import style from "./line.module.css";

interface ILine {
  changeCursor: (pen: Tool) => void;
}
const Line = ({ changeCursor }: ILine) => {
  return (
    <div onClick={() => changeCursor("line")}>
      <div className={style.line}></div>
    </div>
  );
};

export default Line;
