import React, { useCallback, useEffect } from "react";
import cn from "classnames";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useStore } from "../../../hooks";
import { useTotalCostOrder } from "../../../hooks/useTotalCostOrder";
import { useIngredientsIds } from "../../../hooks/useIngredientsIds";
import {
  postOrders,
  setIngredientsIds,
  setOpenOrderModal,
  setOrderTotal,
} from "../../../store/orderSlice";
import s from "./BurgerConstructorTotal.module.css";
import { ButtonWithChildren } from "../../ButtonWithChildren/ButtonWithChildren";

export const BurgerConstructorTotal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    order: { total, loading },
    profile: { user },
  } = useStore();

  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();

  const { totalCost } = useTotalCostOrder();
  const { orderIngredientsIds } = useIngredientsIds();

  const handlerOnOpenModal = useCallback(() => {
    if (user) {
      dispatch(setOpenOrderModal(true));
      dispatch(setIngredientsIds([...orderIngredientsIds]));
      if (accessToken) {
        dispatch(
          postOrders({
            ingredientsIds: [...orderIngredientsIds],
            token: accessToken,
          })
        );
      }
    } else navigate("login", { state: { from: location } });
  }, [user, orderIngredientsIds, navigate, dispatch, location, accessToken]);

  useEffect(() => {
    dispatch(setOrderTotal(totalCost));
  }, [totalCost, dispatch]);

  return (
    <>
      <div className={s.totalPriceWrapper}>
        <div className={s.totalPrice}>
          <p className={cn(s.totalPrice__price, `constructor-element__price`)}>
            {total}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <ButtonWithChildren
          htmlType="button"
          type="primary"
          size="large"
          onClick={handlerOnOpenModal}
          disabled={!total}
        >
          <span>Оформить заказ</span>
        </ButtonWithChildren>
      </div>
    </>
  );
};

export default BurgerConstructorTotal;
