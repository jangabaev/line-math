import { FaHandPaper } from "react-icons/fa";
import { useCanvasStore, type Tool } from "../../../../store/useCanvasStore.js";
interface IGrab {
  changeCursor: (pen: Tool) => void;
}

const Grab = ({ changeCursor }: IGrab) => {
  return (
    <div onClick={() => changeCursor("grab")}>
      <FaHandPaper />
    </div>
  );
};

export default Grab;
