import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useStore } from "../../hooks";
import { BurgerIngredientType, OrderType } from "../../models";
import { formatOrderTime } from "../../utils/formatOrderTime";
import { getOrderStatus } from "../../utils/getOrdersStatus";
import { IngredientPreview } from "../IngredientPreview/IngredientPreview";
import s from "./Order.module.css";

export const Order = () => {
  const {
    orders: { viewOrder },
    burgerIngredients: { ingredients },
  } = useStore();

  const [order, setOrder] = useState<
    OrderType & { total: number; ingredientsTotal: BurgerIngredientType[] }
  >();

  useEffect(() => {
    if (viewOrder) {
      if (ingredients) {
        let total = 0;
        const orderIngredients = viewOrder.ingredients.map((id) =>
          ingredients.find((ingredient) => {
            if (id === ingredient._id) {
              total = total + ingredient.price;
            }
            return id === ingredient._id;
          })
        );

        let orderIngredientsTotal: BurgerIngredientType[] | never = [];
        orderIngredients.forEach((orderIngredient) => {
          const flag = orderIngredientsTotal.every(
            (item) => item._id !== orderIngredient?._id
          );
          if (flag) {
            if (orderIngredient) {
              orderIngredientsTotal.push({
                ...orderIngredient,
                count: orderIngredients.filter(
                  (item) => item?._id === orderIngredient?._id
                ).length,
              });
            }
          }
        });
        setOrder({
          ...viewOrder,
          total: total,
          ingredientsTotal: orderIngredientsTotal,
        });
      }
    }
  }, [viewOrder, ingredients]);

  return (
    <section>
      <h1 className={s.h1}>Заказ</h1>
      <div className={s.container}>
        <h2>{order?.name}</h2>
        <p
          className={cn(
            "text text_type_main-default mt-3 mb-15",
            order?.status === "done" && "text_color_interface"
          )}
        >
          {order ? getOrderStatus(String(order.status)) : ""}
        </p>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <div className={cn(s.ingredients, "pr-6")}>
          {order?.ingredientsTotal.map((item) => (
            <div key={item._id} className={s.ingredients__card}>
              <div className={s.ingredients__card}>
                <IngredientPreview ingredient={item} />
                <h1 className={s.ingredients__title}>{item?.name}</h1>
              </div>
              <span
                className={cn(
                  "constructor-element__price",
                  s.ingredients__price
                )}
              >
                {`${item?.count} x `}
                {item?.price}
                <CurrencyIcon type="primary" />
              </span>
            </div>
          ))}
        </div>
        <div className={s.total}>
          <p className="text text_type_main-default text_color_inactive">
            {order ? formatOrderTime(order.createdAt) : ""}
          </p>
          <span
            className={cn("constructor-element__price", s.ingredients__price)}
          >
            {order ? order.total : ""}
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </div>
    </section>
  );
};
