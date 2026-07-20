import React from "react";
import style from "./panel.module.css";
import Pen from "./cursors/pen/index.js";
import Hand from "./cursors/hand/index.js";
import Grab from "./cursors/grab/index.js";
import { useCanvasStore } from "../../store/useCanvasStore.js";
import Zoom from "./zoom/index.js";
import Rectangle from "./cursors/rectangle/index.js";

const Panel = () => {
  const { changeCursor, selected, isDrawing } = useCanvasStore(
    (state) => state,
  );
  return (
    <div
      className={style.panel}
      style={{ pointerEvents: selected || isDrawing ? "none" : "all" }}
    >
      <Pen changeCursor={changeCursor} />
      <Hand changeCursor={changeCursor} />
      <Grab changeCursor={changeCursor} />
      <Rectangle changeCursor={changeCursor} />
      <Zoom />
    </div>
  );
};

export default Panel;
