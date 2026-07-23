import { useCanvasStore } from "../../../store/useCanvasStore.js";
import type { LineStart } from "../../../types/line.js";
import ButtonIcon from "../../ui/buttonIcon/button.js";
import RangeInput from "../../ui/range/range.js";
import style from "./line.module.css";
// bul sizlarg'a ren beriw qalinliq sol zatlardi ozgartiw

const LineDesign = () => {
  const { designAll, setLineStyle, cursor } = useCanvasStore((state) => state);
  return (
    <>
      <p>Stroke</p>
      <div className={style.colors}>
        {["#1212e6", "#000000", "#ff0000", "#ff9500", "#008000"].map((el) => (
          <div
            className={style.color}
            onClick={() => setLineStyle({ ...designAll, color: el })}
            style={{ backgroundColor: el }}
          ></div>
        ))}
        <div className={style.line}></div>
        <div
          className={style.color_choose}
          style={{ backgroundColor: designAll.color }}
        ></div>
      </div>

      <div className={style.range}>
        <RangeInput
          label="opacity"
          defaultValue={designAll.opacity * 100}
          onChange={(e) =>
            setLineStyle({ ...designAll, opacity: Math.floor(e / 10) / 10 })
          }
        />
      </div>
      <p className={style.text}>Stroke width</p>
      <div className={style.width}>
        <ButtonIcon onClick={() => setLineStyle({ ...designAll, width: 1 })}>
          <span className={style.strokeLine1}></span>
        </ButtonIcon>
        <ButtonIcon onClick={() => setLineStyle({ ...designAll, width: 3 })}>
          <span className={style.strokeLine2}></span>
        </ButtonIcon>
        <ButtonIcon onClick={() => setLineStyle({ ...designAll, width: 5 })}>
          <span className={style.strokeLine3}></span>
        </ButtonIcon>
      </div>
    </>
  );
};

export default LineDesign;
