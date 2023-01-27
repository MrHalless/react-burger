import React from "react";
import burgerPicture from "../../../images/burger.svg";
import s from "./BurgerConstructorEmpty.module.css";

const BurgerConstructorEmpty: React.FC = () => (
  <div className={s["wrapper"]}>
    <span className={s["wrapper-title"]}>Поместите ингредиенты сюда...</span>
    <img src={burgerPicture} alt={"Бургер"} className={s["img"]} />
  </div>
);

export default BurgerConstructorEmpty;
