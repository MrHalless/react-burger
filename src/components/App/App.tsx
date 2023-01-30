import React, { useCallback, useEffect } from "react";
import s from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { fetchIngredients } from "../../store/burgerIngredientsSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useStore } from "../../hooks/index";
import { resetCurrentIngredient } from "../../store/currentIngredientSlice";
import { setOpenOrderModal } from "../../store/orderSlice";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Loader from "../Loader/Loader";
import BadRequest from "../BadRequest/BadRequest";

function App() {
  const dispatch = useDispatch();
  const {
    burgerIngredients: { loading, error },
    currentIngredient: { isOpen: isOpenCurrentIngredientModal },
    order: { isOpen: isOpenOrderModal },
  } = useStore();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handlerOnCloseCurrentIngredientModal = useCallback(() => {
    dispatch(resetCurrentIngredient());
  }, [dispatch]);

  const handlerOnCloseOrderModal = useCallback(() => {
    dispatch(setOpenOrderModal(false));
  }, [dispatch]);

  return (
    <div className={s["App"]}>
      <AppHeader />
      <main className={s["App-main-wrapper"]}>
        {loading === "pending" && <Loader />}
        {loading === "succeeded" && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
        {loading === "failed" && <BadRequest error={error} />}
        {isOpenCurrentIngredientModal && (
          <Modal
            title={"Детали ингредиента"}
            onClose={handlerOnCloseCurrentIngredientModal}
          >
            <IngredientDetails />
          </Modal>
        )}
        {isOpenOrderModal && (
          <Modal title={undefined} onClose={handlerOnCloseOrderModal}>
            <OrderDetails />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
