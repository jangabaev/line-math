import { RxCursorArrow } from "react-icons/rx";
import { useCanvasStore } from "../../../../store/useCanvasStore.js";


const Hand = () => {
  const {changeCursor,cursor}=useCanvasStore((state)=>state)
  return (
    <div onClick={() => changeCursor("hand")}>
      <RxCursorArrow />
    </div>
  );
};

export default Hand;
