import React from "react";
import cn from "classnames";
import doneIcon from "../../images/doneIcon.svg";
import s from "./OrderDetails.module.css";
import { useStore } from "../../hooks";
import Loader from "../Loader/Loader";
import BadRequest from "../BadRequest/BadRequest";

const OrderDetails: React.FC = () => {
  const {
    order: { num, error, loading },
  } = useStore();

  return (
    <>
      <div className={cn(s["order-details"])}>
        {loading === "pending" && <Loader />}
        {loading === "succeeded" && (
          <span
            className={cn(
              s["order-details_id-number"],
              "text text_type_digits-large mt-4 mb-8"
            )}
          >
            {num}
          </span>
        )}
        {loading === "failed" && <BadRequest error={error} />}
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
