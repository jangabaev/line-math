import { useCanvasStore } from "../../../../store/useCanvasStore.js";
import type { Tool } from "../../../../types/index.js";
import { FiTriangle } from "react-icons/fi";

const Triangle = () => {
  const { cursor, changeCursor } = useCanvasStore((state) => state);
  return (
    <div
      onClick={() => changeCursor("triangle")}
      className={`${cursor === "triangle" && "active"} panel_cursor`}
    >
      <FiTriangle />
    </div>
  );
};

export default Triangle;
