import cn from "classnames";
import { useLocation } from "react-router";
import { useStore } from "../../hooks";

import { feedRegExp } from "../../utils/regexp";
import BadRequest from "../BadRequest/BadRequest";
import Loader from "../Loader/Loader";

import s from "./Orders.module.css";
import OrdersList from "./OrdersList/OrdersList";


const Orders: React.FC = () => {
  const {
    burgerIngredients: { loading, error },
  } = useStore();

  const location = useLocation();
  const isFeed = feedRegExp.test(location.pathname);
  return (
    <section
      className={cn(
        s.container,
        isFeed ? s.container_medium : s.container_large
      )}
    >
      <div className={s.container__content}>
        <h2 className={cn(s.title)}>Заказы</h2>
        <>
          {loading === "pending" && <Loader />}
          {loading === "succeeded" && <OrdersList />}
          {loading === "failed" && <BadRequest error={error} />}
        </>
      </div>
    </section>
  );
};

export default Orders;
