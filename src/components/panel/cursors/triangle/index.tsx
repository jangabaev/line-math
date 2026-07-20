import type { Tool } from "../../../../types/index.js";
import { FiTriangle } from "react-icons/fi";

interface ITriangle {
  changeCursor: (pen: Tool) => void;
}

const Triangle = ({ changeCursor }: ITriangle) => {
  return (
    <div onClick={() => changeCursor("triangle")}>
      <FiTriangle />
    </div>
  );
};

export default Triangle;
