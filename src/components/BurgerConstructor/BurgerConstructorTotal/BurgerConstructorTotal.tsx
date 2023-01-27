import React, { useCallback, useEffect } from "react";
import cn from "classnames";
import s from "./BurgerConstructorTotal.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useStore } from "../../../hooks";
import {
  postOrders,
  setIngredientsIds,
  setOpenOrderModal,
  setOrderTotal,
} from "../../../store/orderSlice";
import { useIngredientsIds } from "../../../hooks/useIngredientsIds";
import { useTotalCostOrder } from "../../../hooks/useTotalCostOrder";

const BurgerConstructorTotal: React.FC = () => {
  const dispatch = useDispatch();

  const {
    order: { total },
  } = useStore();

  const { totalCost } = useTotalCostOrder();
  const { orderIngredientsIds } = useIngredientsIds();

  const handlerOnOpenModal = useCallback(() => {
    dispatch(setOpenOrderModal(true));
    dispatch(setIngredientsIds(orderIngredientsIds));
    dispatch(postOrders(orderIngredientsIds));
  }, [orderIngredientsIds, dispatch]);

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
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handlerOnOpenModal}
          disabled={total === 0}
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
};

export default BurgerConstructorTotal;
