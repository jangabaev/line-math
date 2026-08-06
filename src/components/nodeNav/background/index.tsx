import { useCanvasStore } from "../../../store/useCanvasStore.js";
import RangeInput from "../../ui/range/range.js";
import ButtonIcon from "../../ui/buttonIcon/button.js";
import style from "./background.module.css";

const Background = () => {
  const { designAll, setLineStyle, cursor } = useCanvasStore((state) => state);
  return (
    <>
      <p>Stroke</p>
      <div className={style.colors}>
        {["#1212e600", "#ff010169", "#51ff0069", "#3f6ff350", "#eeff035d"].map(
          (el) => (
            <div
              className={style.color}
              onClick={() => setLineStyle({ ...designAll, background: el })}
              style={{ backgroundColor: el }}
            ></div>
          ),
        )}
        <div className={style.line}></div>
        <div
          className={style.color_choose}
          style={{ backgroundColor: designAll.background }}
        ></div>
      </div>
    </>
  );
};

export default Background;
