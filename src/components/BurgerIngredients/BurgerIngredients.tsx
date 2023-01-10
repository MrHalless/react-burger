import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { DataApi } from "../../models";
import s from "./BurgerIngredients.module.css";
import BurgerIngredientsList from "./BurgerIngredientsList/BurgerIngredientsList";

type BurgerIngredientsProps = {
  data: DataApi[];
};

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ data }) => {
  const [currentTab, setcurrentTab] = useState("all");

  return (
    <div className={s.wrapper}>
      <p className="text text_type_main-large title mb-5">Соберите бургер</p>
      <div className={s.tabs}>
        <Tab
          value={"buns"}
          active={currentTab === "buns"}
          onClick={setcurrentTab}
        >
          Булки
        </Tab>
        <Tab
          value={"sauces"}
          active={currentTab === "sauces"}
          onClick={setcurrentTab}
        >
          Соусы
        </Tab>
        <Tab
          value={"toppings"}
          active={currentTab === "toppings"}
          onClick={setcurrentTab}
        >
          Начинки
        </Tab>
      </div>
      <div className={s.ingredients}>
        {currentTab === "all" && (
          <>
            <BurgerIngredientsList
              title={"Булки"}
              data={data.filter((item) => item.type === "bun")}
            />
            <BurgerIngredientsList
              title={"Соусы"}
              data={data.filter((item) => item.type === "sauce")}
            />
            <BurgerIngredientsList
              title={"Начинки"}
              data={data.filter((item) => item.type === "main")}
            />
          </>
        )}
        {currentTab === "buns" && (
          <BurgerIngredientsList
            title={"Булки"}
            data={data.filter((item) => item.type === "bun")}
          />
        )}
        {currentTab === "sauces" && (
          <BurgerIngredientsList
            title={"Соусы"}
            data={data.filter((item) => item.type === "sauce")}
          />
        )}
        {currentTab === "toppings" && (
          <BurgerIngredientsList
            title={"Начинки"}
            data={data.filter((item) => item.type === "main")}
          />
        )}
      </div>
    </div>
  );
};

export default BurgerIngredients;
