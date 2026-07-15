import React from "react";
import style from "./panel.module.css";
import Pen from "./cursors/pen/index.js";
import Hand from "./cursors/hand/index.js";
import { useCanvasStore } from "../../store/useCanvasStore.js";
import Zoom from "./zoom/index.js";

const Panel = () => {
  const { changeCursor } = useCanvasStore((state) => state);
  return (
    <div className={style.panel}>
      <Pen changeCursor={changeCursor} />
      <Hand changeCursor={changeCursor} />
      <Zoom/>
    </div>
  );
};

export default Panel;
