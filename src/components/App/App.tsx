import React, { useEffect } from "react";
import { useDispatch, useStore } from "../../hooks";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { RoutesApp } from "../../routes/Routes";
import { fetchIngredients } from "../../store/burgerIngredientsSlice";
import { clearError } from "../../store/errorRequestSlice";
import { getUser, resetUser } from "../../store/profileSlice";
import AppHeader from "../AppHeader/AppHeader";
import BadRequest from "../BadRequest/BadRequest";
import Modal from "../Modal/Modal";
import s from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const {
    profile: { user },
    errorRequest: { isError, message },
  } = useStore();

  const { callErrorHandler } = useErrorHandler();

  const handlerOnCloseErrorModal = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    accessToken && dispatch(getUser(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    callErrorHandler();
  }, [callErrorHandler]);

  useEffect(() => {
    !refreshToken && !accessToken && user && dispatch(resetUser());
  }, [refreshToken, accessToken, user, dispatch]);

  return (
    <div className={s["App"]}>
      <AppHeader />
      <RoutesApp />
      {isError && (
        <Modal title="Ошибка" onClose={handlerOnCloseErrorModal}>
          <BadRequest error={message} />
        </Modal>
      )}
    </div>
  );
};

export default App;
