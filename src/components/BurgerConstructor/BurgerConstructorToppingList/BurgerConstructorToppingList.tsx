import React from "react";
import s from "./BurgerConstructorToppingList.module.css";
import { useStore } from "../../../hooks";
import BurgerConstructorCard from "../BurgerConstructorCard/BurgerConstructorCard";

const BurgerConstructorToppingsList: React.FC = () => {
  const {
    burgerConstructor: { toppings },
  } = useStore();
  return (
    <div className={s["toppings"]}>
      {toppings.map((topping) => (
        <BurgerConstructorCard key={topping.innerId} ingredient={topping} />
      ))}
    </div>
  );
};

export default BurgerConstructorToppingsList;
