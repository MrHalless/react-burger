import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { DataApi } from "../../../models";
import s from "./BurgerConstructorCard.module.css";

type BurgerConstructorCardProps = {
  data: DataApi;
  type?: "top" | "bottom" | undefined;
  isLocked?: boolean;
};

const BurgerConstructorCard: React.FC<BurgerConstructorCardProps> = ({
  data,
  type,
  isLocked = false,
}) => {
  return (
    <div className={s.wrapper}>
      {!type && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
      />
    </div>
  );
};

export default BurgerConstructorCard;
