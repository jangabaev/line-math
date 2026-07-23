import { RxCursorArrow } from "react-icons/rx";
import { useCanvasStore } from "../../../../store/useCanvasStore.js";

const Hand = () => {
  const { changeCursor, cursor } = useCanvasStore((state) => state);
  return (
    <div
      onClick={() => changeCursor("hand")}
      className={`${cursor === "hand" && "active"} panel_cursor`}
    >
      <RxCursorArrow />
    </div>
  );
};

export default Hand;
