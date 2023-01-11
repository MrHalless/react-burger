import React from "react";
import "./App.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { data } from "../../utils/data";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="App-main-wrapper">
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </div>
    </div>
  );
}

export default App;
