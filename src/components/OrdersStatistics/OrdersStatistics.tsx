import cn from "classnames";
import { useStore } from "../../hooks";
import { formatOrderNumber } from "../../utils/formatOrderNumber";
import { normalizeTotalCount } from "../../utils/normalizeTotalCount";

import s from "./OrdersStatistics.module.css";

const OrdersStatistics: React.FC = () => {
  const {
    orders: { ordersData },
  } = useStore();

  return (
    <section className={s.container}>
      <h2 className={s.title}>Статистика заказов</h2>
      <div className={s.wrapper}>
        <div className={cn("mr-9", s.feed)}>
          <p className="text text_type_main-medium mb-6">Готовы: </p>
          <div className={s.orders}>
            {ordersData?.orders
              .filter((order) => order.status === "done")
              .splice(0, 10)
              .map((order) => (
                <p
                  key={order._id}
                  className={
                    "text text_type_digits-default text_color_interface"
                  }
                >
                  {formatOrderNumber(String(order.number))}
                </p>
              ))}
          </div>
        </div>
        <div className={s.feed}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={s.orders}>
            {ordersData?.orders
              .filter((order) => order.status !== "done")
              .splice(0, 10)
              .map((order) => (
                <p key={order._id} className={"text text_type_digits-default"}>
                  {formatOrderNumber(String(order.number))}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className={s.wrapper}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">
          {normalizeTotalCount(ordersData?.total)}
        </p>
      </div>
      <div className={s.wrapper}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">
          {normalizeTotalCount(ordersData?.totalToday)}
        </p>
      </div>
    </section>
  );
};

export default OrdersStatistics;
