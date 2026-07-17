import { useCanvasStore } from "../../store/useCanvasStore.js"
import style from "./line.module.css"
import LineDesign from "./Line/index.js"

// bul chep qaptaldag'i lina ushin renlerdi ozgertiw

const SettingsFigure=()=>{
    // const selected="aylana"
    const {selected}=useCanvasStore((state)=>state)
    return <nav className={style.nav}  style={{pointerEvents:selected?"none":"all"}}>
        <LineDesign/>
    </nav>
}

export default SettingsFigure