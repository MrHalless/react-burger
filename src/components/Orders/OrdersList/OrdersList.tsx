import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { feedRegExp, profileRegExp } from "../../../utils/regexp";
import { useStore } from "../../../hooks";
import { OrdersType } from "../../../models";
import Loader from "../../Loader/Loader";
import OrdersCard from "../OrdersCard/OrdersCard";
import cn from "classnames";
import s from "./OrdersList.module.css";

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
  }, [isProfile, ordersData]);

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

export default React.memo(OrdersList);
