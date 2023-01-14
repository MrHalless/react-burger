import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { getData } from "../../utils/getData";

function App() {
  const [state, setState] = useState({
    data: [],
    pending: true,
    error: null,
  });

  useEffect(() => {
    setState({ ...state, pending: true });

    getData()
      .then((data) =>
        setState({ ...state, data: data.data, pending: false, error: null })
      )
      .catch((error) => {
        setState({ ...state, pending: false, error: error.message });
      });
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className="App-main-wrapper">
        {state.error && (
          <div
            className={`mt-10 text text_type_main-large`}
          >{`Ошибка: ${state.error}`}</div>
        )}

        {state.pending ? (
          <div className="preloader"></div>
        ) : (
          <>
            <BurgerIngredients data={state.data} />
            <BurgerConstructor data={state.data} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
