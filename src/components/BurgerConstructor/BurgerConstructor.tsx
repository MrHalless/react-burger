import React, { useMemo, useState } from "react";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorCard from "./BurgerConstructorCard/BurgerConstructorCard";
import { DataApi } from "../../models";
import s from "./BurgerConstructor.module.css";

import cn from "classnames";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

type BurgerConstructorProps = {
  data: DataApi[];
};

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ data }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const bun = useMemo(
    () => data.filter((item) => item.type === "bun")[0],
    [data]
  );

  const allPrice = useMemo(
    () => data.reduce((acc, item) => acc + item.price, 0),
    [data]
  );

  return (
    <section className={s.section}>
      <div className={s.burgerConstructorWrapper}>
        <div className={s.burgerConstructorWrapper__bun}>
          <BurgerConstructorCard data={bun} type={"top"} isLocked={true} />
        </div>

        <div className={s.toppingList}>
          {data
            .filter((item) => item.type !== "bun")
            .map((filteredItem, index) => {
              return <BurgerConstructorCard key={index} data={filteredItem} />;
            })}
        </div>
        <div className={s.burgerConstructorWrapper__bun}>
          <BurgerConstructorCard data={bun} type={"bottom"} isLocked={true} />
        </div>
      </div>
      <div className={s.totalPriceWrapper}>
        <div className={s.totalPrice}>
          <p className={cn(s.totalPrice__price, `constructor-element__price`)}>
            {allPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>
      {isShowModal && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
