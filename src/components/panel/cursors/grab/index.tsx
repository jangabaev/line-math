import { FaHandPaper } from "react-icons/fa";
import { type Tool } from "../../../../types/index.js";
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
