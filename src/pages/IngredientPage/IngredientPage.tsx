import { useEffect } from "react";
import { useParams } from "react-router";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useStore } from "../../hooks";
import { setCurrentIngredient } from "../../store/currentIngredientSlice";

const IngredientPage = () => {
  const {
    burgerIngredients: { ingredients, loading },
  } = useStore();

  const dispatch = useDispatch();
  const isLoading = loading === "pending";

  const { id } = useParams();

  useEffect(() => {
    if (id && ingredients)
      dispatch(
        setCurrentIngredient(ingredients.find((item) => item._id === id))
      );
  }, [id, ingredients, dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="pt-30">
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
