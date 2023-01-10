import React from "react";
import { DataApi } from "../../../models";
import s from "./BurgerIngredients.module.css";

type BurgerIngredientsProps = {
  data: DataApi[];
};

const BurgerIngredientItem: React.FC<BurgerIngredientsProps> = ({ data }) => {
  console.log(data);
  return <div className={s.wrapper}>BurgerIngredientItem</div>;
};

export default BurgerIngredientItem;
