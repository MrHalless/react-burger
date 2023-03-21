import { useEffect } from "react";
import { useLocation, useParams } from "react-router";

import { feedRegExp, profileRegExp } from "../../utils/regexp";
import s from "./OrderPage.module.css";
import { useDispatch, useStore } from "../../hooks";
import { ALL_ORDERS, SOCKET } from "../../utils/constant";
import { wsClose, wsInit } from "../../store/ordersSlice";
import { useViewOrder } from "../../hooks/useViewOrder";
import { formatOrderNumber } from "../../utils/formatOrderNumber";
import { Order } from "../../components/Order/Order";
import Loader from "../../components/Loader/Loader";
import cn from "classnames";

const OrderPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    orders: { viewOrder },
    profile: { user },
  } = useStore();

  const location = useLocation();

  const isFeed = feedRegExp.test(location.pathname);
  const isProfile = profileRegExp.test(location.pathname);
  const { id } = useParams();

  const accessToken = localStorage.getItem("accessToken")?.split(" ")[1];

  useEffect(() => {
    if (isFeed) {
      dispatch(wsInit(`${SOCKET}${ALL_ORDERS}`));
      return () => {
        dispatch(wsClose());
      };
    }
  }, [dispatch, isFeed]);

  useEffect(() => {
    if (user && isProfile) {
      dispatch(wsInit(`${SOCKET}?token=${accessToken}`));
      return () => {
        dispatch(wsClose());
      };
    }
  }, [dispatch, accessToken, user, isProfile]);

  useViewOrder(id);

  return (
    <main className="pt-20">
      {viewOrder ? (
        <>
          <h1>
            <span
              className={cn("text text_type_digits-default mb-10", s.title)}
            >
              #{viewOrder && formatOrderNumber(String(viewOrder.number))}
            </span>
          </h1>
          <Order />
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default OrderPage;
