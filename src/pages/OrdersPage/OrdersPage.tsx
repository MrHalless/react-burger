import { useEffect } from "react";
import cn from "classnames";
import { wsClose, wsInit } from "../../store/ordersSlice";
import { ALL_ORDERS, SOCKET } from "../../utils/constant";
import { useDispatch } from "../../hooks";
import { useNavHeader } from "../../hooks/useNavHeader";
import Orders from "../../components/Orders/Orders";
import OrdersStatistics from "../../components/OrdersStatistics/OrdersStatistics";
import s from "../MainPage/MainPage.module.css";

const OrdersPage: React.FC = () => {
  const { setActive } = useNavHeader();
  const dispatch = useDispatch();

  useEffect(() => {
    setActive("feed");
  }, [setActive]);

  useEffect(() => {
    dispatch(wsInit(`${SOCKET}${ALL_ORDERS}`));
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  return (
    <main className={s.main}>
      <h1 className={cn("pt-10 pb-5", s.title)}>Лента заказов</h1>
      <aside className={s.main__content}>
        <Orders />
        <OrdersStatistics />
      </aside>
    </main>
  );
};

export default OrdersPage;
