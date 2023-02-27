import React, { useCallback } from "react";
import s from "./BurgerIngredientsCard.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import shortid from "shortid";
import { BurgerIngredientType } from "../../../models";
import { useLocation, useNavigate } from "react-router-dom";

type BurgerIngredientsCardProps = {
  ingredient: BurgerIngredientType;
};

const BurgerIngredientsCard: React.FC<BurgerIngredientsCardProps> = ({
  ingredient,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ opacity }, dragRef] = useDrag({
    item: { ...ingredient, innerId: shortid.generate() },
    type: "ingredient",
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handlerOnClick = () => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  return (
    <>
      <div className={s["container"]} onClick={handlerOnClick}>
        {ingredient?.count > 0 && (
          <Counter count={ingredient.count} size="default" />
        )}
        <img
          ref={dragRef}
          style={{ opacity }}
          alt={ingredient.name}
          src={ingredient.image}
          className={s.img}
        />
        <div className="constructor-element__price mb-2 mt-2">
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </div>
        <p className={(s.title, `text text_type_main-default`)}>
          {ingredient.name}
        </p>
      </div>
    </>
  );
};

export default BurgerIngredientsCard;
