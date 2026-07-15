import { useCanvasStore } from "../../../store/useCanvasStore.js";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";


const Zoom = () => {
    const { camera,moveCamera } = useCanvasStore(state => state)
    return (<>
        <div onClick={()=>moveCamera({...camera,zoom:camera.zoom+.1})}>
            <FaPlus />
        </div>
        <h2>
            {Math.floor(camera.zoom * 100)} %
        </h2>
        <div  onClick={()=>moveCamera({...camera,zoom:camera.zoom-.1})}>
            <FaMinus />
        </div>
    </>)
}

export default Zoom