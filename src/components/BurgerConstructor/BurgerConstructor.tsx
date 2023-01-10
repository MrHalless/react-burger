import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { DataApi } from "../../models";
import s from "./BurgerConstructor.module.css";
import BurgerConstructorCard from "./BurgerConstructorCard/BurgerConstructorCard";

type BurgerConstructorProps = {
  data: DataApi[];
};

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ data }) => {
  return (
    <section className={s.section}>
      <div className={s.burgerConstructorWrapper}>
        <div className={s.burgerConstructorWrapper__bun}>
          <BurgerConstructorCard
            data={
              data.filter((item) => item.name === "Краторная булка N-200i")[0]
            }
            type={"top"}
            isLocked={true}
          />
        </div>

        <div className={s.toppingList}>
          {data
            .filter((item) => item.type !== "bun")
            .map((filteredItem) => {
              return <BurgerConstructorCard data={filteredItem} />;
            })}
        </div>
        <div className={s.burgerConstructorWrapper__bun}>
          <BurgerConstructorCard
            data={
              data.filter((item) => item.name === "Краторная булка N-200i")[0]
            }
            type={"bottom"}
            isLocked={true}
          />
        </div>
      </div>
      <div className={s.totalPriceWrapper}>
        <div className={s.totalPrice}>
          <p className={s.totalPrice__price}>
            {data.reduce((acc, item) => acc + item.price, 0)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
