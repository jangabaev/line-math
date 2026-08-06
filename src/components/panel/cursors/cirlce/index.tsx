import { FaRegCircle } from "react-icons/fa";

import { useCanvasStore } from "../../../../store/useCanvasStore.js";

const Circle = () => {
  const { changeCursor, cursor } = useCanvasStore((state) => state);
  return (
    <div
      onClick={() => changeCursor("circle")}
      className={`${cursor === "circle" && "active"} panel_cursor`}
    >
      <FaRegCircle />
    </div>
  );
};

export default Circle;
