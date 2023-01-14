import React, { useState } from "react";
import s from "./BurgerIngredientsCard.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DataApi } from "../../../models";
import Modal from "../../Modal/Modal";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";

type sProps = {
  data: DataApi;
  count: number | undefined;
};

const BurgerIngredientsCard: React.FC<sProps> = ({ data, count }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <div className={s.container} onClick={openModal}>
        {count && <Counter count={count} size="default" />}
        <img alt={data.name} src={data.image} className={s.img} />
        <div className="constructor-element__price mb-2 mt-2">
          {data.price}
          <CurrencyIcon type="primary" />
        </div>
        <p className={(s.title, `text text_type_main-default`)}>{data.name}</p>
      </div>

      {isShowModal && (
        <Modal title={"Детали ингредиента"} onClose={closeModal}>
          <IngredientDetails data={data} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredientsCard;
