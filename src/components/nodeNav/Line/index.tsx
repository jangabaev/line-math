
import ButtonIcon from "../../ui/buttonIcon/button.js"
import style from "./line.module.css"
// bul sizlarg'a ren beriw qalinliq sol zatlardi ozgartiw

const LineDesign=()=>{
    return <>
    <p>Stroke</p>
    <div className={style.colors}>
        {Array(5).fill(null).map((el)=><div className={style.color}></div>)}
        <div className={style.line}></div>
        <div className={style.color_choose}></div>
        </div>

        <ButtonIcon>r</ButtonIcon>
    </>
}

export default LineDesign