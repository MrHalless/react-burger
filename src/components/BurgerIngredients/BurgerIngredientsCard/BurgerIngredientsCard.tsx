import React from "react";
import s from "./BurgerIngredientsCard.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DataApi } from "../../../models";

type sProps = {
  data: DataApi;
  count: number | undefined;
};

const BurgerIngredientsCard: React.FC<sProps> = ({ data, count }) => {
  return (
    <div className={s.container}>
      {count && <Counter count={count} size="default" />}
      <img alt={data.name} src={data.image} className={s.img} />
      <div className="constructor-element__price mb-2 mt-2">
        {data.price}
        <CurrencyIcon type="primary" />
      </div>
      <p className={(s.title, `text text_type_main-default`)}>{data.name}</p>
    </div>
  );
};

export default BurgerIngredientsCard;
