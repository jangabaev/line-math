import { FaHandPaper } from "react-icons/fa";
import { type Tool } from "../../../../types/index.js";
import { useCanvasStore } from "../../../../store/useCanvasStore.js";

const Grab = () => {
  const { changeCursor, cursor } = useCanvasStore((state) => state);
  return (
    <div
      onClick={() => changeCursor("grab")}
      className={`${cursor === "grab" && "active"} panel_cursor`}
    >
      <FaHandPaper />
    </div>
  );
};

export default Grab;
