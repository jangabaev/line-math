import React from "react";
import style from "./panel.module.css";
import Pen from "./cursors/pen/index.js";

const Panel = () => {
  return (
    <div className={style.panel}>
      <Pen />
    </div>
  );
};

export default Panel;
