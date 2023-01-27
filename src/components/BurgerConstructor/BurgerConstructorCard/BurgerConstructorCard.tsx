import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useStore } from "../../../hooks";
import { BurgerIngredientType } from "../../../models";
import s from "./BurgerConstructorCard.module.css";
import { useDrag, useDrop } from "react-dnd";
import { setToppings } from "../../../store/burgerConstructorSlice";
import { setOrderTotal } from "../../../store/orderSlice";
import { updateCountIngredient } from "../../../store/burgerIngredientsSlice";

type BurgerConstructorCardProps = {
  ingredient: BurgerIngredientType;
  type?: "top" | "bottom" | undefined;
  isLocked?: boolean;
};

const BurgerConstructorCard: React.FC<BurgerConstructorCardProps> = ({
  ingredient,
  type,
  isLocked = false,
}) => {
  const dispatch = useDispatch();
  const {
    burgerIngredients: { ingredients },
    burgerConstructor: { toppings, bun },
  } = useStore();

  const isBun = useMemo(() => ingredient.type === "bun", [ingredient]);

  const handlerDrop = (dropIngredient: BurgerIngredientType) => {
    const indexIngredient = toppings.findIndex(
      (item) => item.innerId === ingredient.innerId
    );
    const indexDropIngredient = toppings.findIndex(
      (item) => item.innerId === dropIngredient.innerId
    );
    let arrDisposition = [...toppings];
    if (indexIngredient < indexDropIngredient) {
      arrDisposition.splice(indexDropIngredient, 1);
      arrDisposition.splice(indexIngredient, 0, dropIngredient);
    } else {
      arrDisposition.splice(indexIngredient + 1, 0, dropIngredient);
      arrDisposition.splice(indexDropIngredient, 1);
    }
    dispatch(setToppings(arrDisposition));
  };

  const [{ opacity }, drag] = useDrag({
    item: ingredient,
    type: "ingredient-constructor",
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const [, drop] = useDrop({
    accept: "ingredient-constructor",
    hover: (dropIngredient, monitor) => {
      !monitor.isOver() && handlerDrop(dropIngredient as BurgerIngredientType);
    },
  });

  const getNameCard = useCallback((type: string | undefined, name: string) => {
    switch (type) {
      case "top":
        return `${name} (верх)`;
      case "bottom":
        return `${name} (низ)`;
      default:
        return name;
    }
  }, []);

  const handlerOnClose = () => {
    let totalCost = -ingredient.price;
    if (toppings.length) {
      totalCost =
        toppings.reduce((acc, item) => acc + item.price, 0) + totalCost;
    }
    if (bun) {
      totalCost = totalCost + 2 * bun.price;
    }
    dispatch(setOrderTotal(totalCost));
    dispatch(
      setToppings(
        toppings.filter((item) => item.innerId !== ingredient.innerId)
      )
    );
    dispatch(
      updateCountIngredient(
        ingredients.map((item) => {
          if (item._id === ingredient._id) {
            if (item.count) {
              return { ...item, count: item.count - 1 };
            }
            return { ...item, count: 0 };
          }
          return item;
        })
      )
    );
  };

  if (!ingredient) return null;
  return (
    <div ref={isBun ? null : drop}>
      <div style={{ opacity }} className={s.wrapper} ref={isBun ? null : drag}>
        {!type && <DragIcon type="primary" />}
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={getNameCard(type, ingredient.name)}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={handlerOnClose}
        />
      </div>
    </div>
  );
};

export default BurgerConstructorCard;
