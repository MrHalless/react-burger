import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import shortid from "shortid";

import { useMemo } from "react";
import { OrderType } from "../../../models";
import { useLocation, useNavigate } from "react-router";
import { feedRegExp, profileRegExp } from "../../../utils/regexp";
import { useOrder } from "../../../hooks/useOrder";
import { formatOrderTime } from "../../../utils/formatOrderTime";
import { getOrderStatus } from "../../../utils/getOrdersStatus";
import s from "./OrdersCard.module.css";
import { formatOrderNumber } from "../../../utils/formatOrderNumber";
import { IngredientPreview } from "../../IngredientPreview/IngredientPreview";

export const OrdersCard = ({
  _id,
  status,
  name,
  number,
  ingredients: ingredientsIds,
  createdAt,
}: OrderType) => {
  const location = useLocation();
  const isFeed = feedRegExp.test(location.pathname);
  const isProfile = profileRegExp.test(location.pathname);
  const navigate = useNavigate();

  const { getTotalOrderCost, getViewOrderIngredients } = useOrder();
  const countNext = ingredientsIds.length - 6;

  const handlerOnClick = () => {
    if (isFeed) navigate(`/feed/${_id}`, { state: { background: location } });
    if (isProfile)
      navigate(`/profile/orders/${_id}`, { state: { background: location } });
  };

  const totalOrderCost = useMemo(
    () => getTotalOrderCost(ingredientsIds),
    [ingredientsIds, getTotalOrderCost]
  );
  const viewOrderIngredients = useMemo(
    () => getViewOrderIngredients(ingredientsIds),
    [ingredientsIds, getViewOrderIngredients]
  );
  const orderTime = useMemo(() => formatOrderTime(createdAt), [createdAt]);
  const orderStatus = useMemo(() => getOrderStatus(status), [status]);

  return (
    <div className={s.container} onClick={handlerOnClick}>
      <div className={s.wrapper}>
        <p className="text text_type_digits-default">
          #{formatOrderNumber(String(number))}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {orderTime}
        </p>
      </div>
      <h5 className={s.wrapper__name}>{name}</h5>
      {isProfile ? (
        <p
          className={cn(
            "text text_type_main-default mt-2",
            s.status,
            status === "done" && "text_color_interface"
          )}
        >
          {orderStatus}
        </p>
      ) : (
        <></>
      )}
      <div className={s.wrapper}>
        <ul className={s.ingredients}>
          {viewOrderIngredients.reverse().map((item, index) => (
            <IngredientPreview
              ingredient={item}
              key={shortid.generate()}
              lastCount={
                (index === 0 && countNext > 0 && countNext) || undefined
              }
              isRotate={true}
            />
          ))}
        </ul>
        <span className="constructor-element__price">
          {totalOrderCost}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};
