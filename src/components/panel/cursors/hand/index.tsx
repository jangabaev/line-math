import { FaRegHandPaper } from "react-icons/fa";
import type { Tool } from "../../../../store/useCanvasStore.js";

interface IHand {
  changeCursor: (pen: Tool) => void;
}
const Hand = ({ changeCursor }: IHand) => {
  return (
    <div onClick={() => changeCursor("hand")}>
      <FaRegHandPaper />
    </div>
  );
};

export default Hand;
