import React from "react";
import { DataApi } from "../../../models";
import BurgerIngridientsCard from "../BurgerIngredientsCard/BurgerIngredientsCard";
import s from "./BurgerIngredientsList.module.css";
import cn from "classnames";

type BurgerIngredientsListProps = {
  id: number;
  data: DataApi[];
  title: string;
};

const BurgerIngredientsList: React.FC<BurgerIngredientsListProps> = ({
  id,
  data,
  title,
}) => {
  const titleClasses = cn(s.listWrapper__title, "text text_type_main-default");

  return (
    <div id={`ingredients-block-${id}`} className={s.listWrapper}>
      <span className={titleClasses}>{title}</span>
      <div className={s.listWrapper__content}>
        {data &&
          data.map((ingredient, index) => (
            <BurgerIngridientsCard
              key={index}
              data={ingredient}
              count={index === 1 ? index : undefined}
            />
          ))}
      </div>
    </div>
  );
};

export default BurgerIngredientsList;
