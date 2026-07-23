import ButtonIcon from "../../ui/buttonIcon/button.js";
import { FaBorderStyle } from "react-icons/fa";
import { TbBorderRadius } from "react-icons/tb";
import style from "./border.module.css";
import { useCanvasStore } from "../../../store/useCanvasStore.js";

const BorderRadius = () => {
  const { designAll, setLineStyle } = useCanvasStore((state) => state);
  return (
    <>
      <p className={style.txt}>Border Radius</p>
      <div className={style.group}>
        <ButtonIcon
          onClick={() => setLineStyle({ ...designAll, borderRadius: 0 })}
        >
          <FaBorderStyle />
        </ButtonIcon>

        <ButtonIcon
          onClick={() => setLineStyle({ ...designAll, borderRadius: 10 })}
        >
          <TbBorderRadius />
        </ButtonIcon>
      </div>
    </>
  );
};

export default BorderRadius;
