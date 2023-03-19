import { useEffect, useState } from "react";
import s from "./OrdersList.module.css";
import { useLocation } from "react-router";
import { feedRegExp, profileRegExp } from "../../../utils/regexp";
import cn from "classnames";
import { useStore } from "../../../hooks";
import { OrdersType } from "../../../models";
import { OrdersCard } from "../OrdersCard/OrdersCard";
import Loader from "../../Loader/Loader";

const OrdersList: React.FC = () => {
  const location = useLocation();
  const isFeed = feedRegExp.test(location.pathname);
  const isProfile = profileRegExp.test(location.pathname);

  const {
    orders: { ordersData },
  } = useStore();

  const [profileOrdersData, setProfileOrdersData] = useState<OrdersType | null>(
    null
  );
  useEffect(() => {
    if (isProfile) {
      if (ordersData?.orders) {
        const reversOrders = [...ordersData.orders];
        setProfileOrdersData({ ...ordersData, orders: reversOrders.reverse() });
      }
    }
  }, [isProfile, ordersData, profileOrdersData]);

  return (
    <div className={cn(s.list, isProfile && s.list_profile)}>
      {ordersData?.orders && isFeed ? (
        ordersData.orders.map((order) => (
          <OrdersCard key={order._id} {...order} />
        ))
      ) : profileOrdersData && isProfile ? (
        profileOrdersData.orders.map((order) => (
          <OrdersCard key={order._id} {...order} />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default OrdersList;