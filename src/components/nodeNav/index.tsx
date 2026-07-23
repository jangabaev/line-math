import { useCanvasStore } from "../../store/useCanvasStore.js";
import BorderRadius from "./borderRadius/index.js";
import style from "./line.module.css";
import LineDesign from "./Line/index.js";

// bul chep qaptaldag'i lina ushin renlerdi ozgertiw

const SettingsFigure = () => {
  // const selected="aylana"
  const { selected, isDrawing, cursor } = useCanvasStore((state) => state);

  if (!(cursor === "pencil" || cursor === "line" || cursor === "rectangle")) {
    return null;
  }
  return (
    <nav
      className={style.nav}
      style={{ pointerEvents: selected || isDrawing ? "none" : "all" }}
    >
      {(cursor === "pencil" || cursor === "line" || cursor === "rectangle") && (
        <LineDesign />
      )}
      {cursor === "rectangle" && <BorderRadius />}
    </nav>
  );
};

export default SettingsFigure;
