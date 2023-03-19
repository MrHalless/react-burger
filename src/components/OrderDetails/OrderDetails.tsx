import React, { useEffect } from "react";
import cn from "classnames";
import doneIcon from "../../images/doneIcon.svg";
import s from "./OrderDetails.module.css";
import { useDispatch, useStore } from "../../hooks";
import Loader from "../Loader/Loader";
import BadRequest from "../BadRequest/BadRequest";
import { resetBurgerConstructor } from "../../store/burgerConstructorSlice";
import { resetCountIngredients } from "../../store/burgerIngredientsSlice";
import { JWT_EXPIRED } from "../../utils/constant";
import { postToken } from "../../store/authSlice";
import { postOrders } from "../../store/orderSlice";
import { formatOrderNumber } from "../../utils/formatOrderNumber";

const OrderDetails: React.FC = () => {
  const {
    order: { num, error, loading, ingredientsIds },
    auth: { loading: loadingToken },
  } = useStore();

  const dispatch = useDispatch();

  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (loading === "succeeded") {
      dispatch(resetBurgerConstructor());
      dispatch(resetCountIngredients());
    }

    if (loading === "failed") {
      if (error === JWT_EXPIRED) {
        dispatch(postToken(refreshToken));
        if (accessToken && loadingToken === "succeeded") {
          dispatch(
            postOrders({ ingredientsIds: ingredientsIds, token: accessToken })
          );
        }
      }
    }
  }, [
    loading,
    dispatch,
    refreshToken,
    accessToken,
    error,
    ingredientsIds,
    loadingToken,
  ]);

  return (
    <>
      <div className={cn(s["order-details"])}>
        {(loading === "pending" || error === JWT_EXPIRED) && <Loader />}
        {loading === "succeeded" && (
          <span
            className={cn(
              s["order-details_id-number"],
              "text text_type_digits-large mt-4 mb-8"
            )}
          >
            {formatOrderNumber(String(num))}
          </span>
        )}
        {loading === "failed" && error !== JWT_EXPIRED && (
          <BadRequest error={error} />
        )}
        <h3 className={"text text_type_main-medium mb-15"}>
          идентификатор заказа
        </h3>
        <img
          src={doneIcon}
          alt="Done"
          className={cn(s["order-details_img"], "mb-15")}
        />
        <span className={"text text_type_main-default mb-2"}>
          Ваш заказ начали готовить
        </span>
        <span
          className={"text text_type_main-default text_color_inactive mb-15"}
        >
          Дождитесь готовности на орбитальной станции
        </span>
      </div>
    </>
  );
};

export default OrderDetails;
