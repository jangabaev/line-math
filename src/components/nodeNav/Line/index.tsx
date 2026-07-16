import { useCanvasStore } from "../../../store/useCanvasStore.js";
import type { LineStart } from "../../../types/line.js";
import ButtonIcon from "../../ui/buttonIcon/button.js";
import style from "./line.module.css";
// bul sizlarg'a ren beriw qalinliq sol zatlardi ozgartiw

const LineDesign = () => {
  const { startLine, setLineStyle } = useCanvasStore((state) => state);
  return (
    <>
      <p>Stroke</p>
      <div className={style.colors}>
        {["#1212e6", "#000000", "#ff0000", "#ff9500", "#008000"].map((el) => (
          <div
            className={style.color}
            onClick={() => setLineStyle({ ...startLine, color: el })}
            style={{ backgroundColor: el }}
          ></div>
        ))}
        <div className={style.line}></div>
        <div
          className={style.color_choose}
          style={{ backgroundColor: startLine.color }}
        ></div>
      </div>

      <ButtonIcon>r</ButtonIcon>
    </>
  );
};

export default LineDesign;
