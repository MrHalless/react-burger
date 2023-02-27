import React, { useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Outlet } from "react-router";
import { useDispatch, useStore } from "../../hooks";
import { useNavHeader } from "../../hooks/useNavHeader";
import { setOpenOrderModal } from "../../store/orderSlice";
import Modal from "../../components/Modal/Modal";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import s from "./MainPage.module.css";

const MainPage = () => {
  const dispatch = useDispatch();

  const { setActive } = useNavHeader();

  const {
    order: { isOpen: isOpenOrderModal },
  } = useStore();

  const handlerOnCloseOrderModal = useCallback(() => {
    dispatch(setOpenOrderModal(false));
  }, [dispatch]);

  useEffect(() => {
    setActive("/");
  });

  return (
    <main className={s.main}>
      <DndProvider backend={HTML5Backend}>
        <aside className={s.main__content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </aside>
      </DndProvider>
      <Outlet />
      {isOpenOrderModal && (
        <Modal title={undefined} onClose={handlerOnCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </main>
  );
};

export default MainPage;
