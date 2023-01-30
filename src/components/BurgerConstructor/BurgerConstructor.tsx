import React from "react";
import BurgerConstructorCard from "./BurgerConstructorCard/BurgerConstructorCard";
import s from "./BurgerConstructor.module.css";
import { useStore } from "../../hooks/useStore";
import BurgerConstructorEmpty from "./BurgerConstructorEmpty/BurgerConstructorEmpty";
import { updateCountIngredient } from "../../store/burgerIngredientsSlice";
import { useDrop } from "react-dnd";
import shortid from "shortid";
import { useDispatch } from "../../hooks/useDispatch";
import { BurgerIngredientType } from "../../models";
import { setBun, setToppings } from "../../store/burgerConstructorSlice";
import BurgerConstructorTotal from "./BurgerConstructorTotal/BurgerConstructorTotal";
import BurgerConstructorToppingsList from "./BurgerConstructorToppingList/BurgerConstructorToppingList";
import cn from "classnames";

const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch();
  const {
    burgerIngredients: { ingredients, loading },
    burgerConstructor: { bun, toppings },
  } = useStore();

  const dropIngredient = (ingredient: BurgerIngredientType) => {
    if (ingredient.type === "bun") {
      if (ingredient._id !== bun?._id) {
        dispatch(setBun({ ...ingredient, innerId: shortid.generate() }));
        dispatch(
          updateCountIngredient(
            ingredients.map((item) => {
              if (item._id === ingredient._id) {
                return { ...item, count: 2 };
              }
              if (item.type === "bun") {
                return { ...item, count: 0 };
              }
              return item;
            })
          )
        );
      }
    } else {
      dispatch(
        setToppings([
          { ...ingredient, innerId: shortid.generate() },
          ...toppings,
        ])
      );
      dispatch(
        updateCountIngredient(
          ingredients.map((item) => {
            if (item._id === ingredient._id) {
              if (item.count) {
                return { ...item, count: item.count + 1 };
              }
              return { ...item, count: 1 };
            }
            return item;
          })
        )
      );
    }
  };

  const [{ isHover }, drop] = useDrop({
    accept: "ingredient",
    drop: dropIngredient,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const wrapperClasses = cn(s["burgerConstructorWrapper"], {
    [s["burgerConstructorWrapper_hover"]]: isHover,
  });

  return (
    <>
      {loading === "succeeded" && (
        <section className={s.section}>
          <div className={wrapperClasses} ref={drop}>
            {!bun && !toppings.length && <BurgerConstructorEmpty />}
            <div className={s.burgerConstructorWrapper__bun}>
              {bun && (
                <BurgerConstructorCard
                  ingredient={bun}
                  type={"top"}
                  isLocked={true}
                />
              )}
            </div>
            {toppings && <BurgerConstructorToppingsList />}
            <div className={s.burgerConstructorWrapper__bun}>
              {bun && (
                <BurgerConstructorCard
                  ingredient={bun}
                  type={"bottom"}
                  isLocked={true}
                />
              )}
            </div>
          </div>
          <BurgerConstructorTotal />
        </section>
      )}
    </>
  );
};

export default BurgerConstructor;
