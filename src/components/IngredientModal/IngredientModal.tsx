import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useDispatch, useStore } from "../../hooks";
import {
  resetCurrentIngredient,
  setCurrentIngredient,
} from "../../store/currentIngredientSlice";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

export const IngredientModal = () => {
  const dispatch = useDispatch();

  const {
    burgerIngredients: { ingredients },
  } = useStore();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id && ingredients)
      dispatch(
        setCurrentIngredient(ingredients.find((item) => item._id === id))
      );
  }, [id, ingredients, dispatch]);

  const handlerOnCloseCurrentIngredientModal = useCallback(() => {
    navigate("/", { state: null });
    dispatch(resetCurrentIngredient());
  }, [dispatch, navigate]);

  return (
    <Modal
      title={"Детали ингредиента"}
      onClose={handlerOnCloseCurrentIngredientModal}
    >
      <IngredientDetails />
    </Modal>
  );
};
