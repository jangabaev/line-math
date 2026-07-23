import { useState } from "react";
import style from "./pressure.module.css";
import ButtonIcon from "../../ui/buttonIcon/button.js";

const Pressure = () => {
  return (
    <>
      <p>Pressure</p>
      <div className={style.cards}>
        <ButtonIcon>1</ButtonIcon>
      </div>
    </>
  );
};
