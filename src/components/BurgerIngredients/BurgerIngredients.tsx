import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";

import { ingredientGroups } from "../../utils/ingredientGroups";
import s from "./BurgerIngredients.module.css";
import BurgerIngredientsList from "./BurgerIngredientsList/BurgerIngredientsList";
import { Link } from "react-scroll";
import { useStore } from "../../hooks/useStore";
import { useDispatch } from "../../hooks/useDispatch";
import { setCurrentTab } from "../../store/burgerIngredientsSlice";

const BurgerIngredients: React.FC = () => {
  const dispatch = useDispatch();
  const {
    burgerIngredients: { ingredients, currentTab },
  } = useStore();

  const tabList = ingredientGroups.map((tab, i) => {
    return (
      <Link
        key={i}
        to={`ingredients-block-${++i}`}
        spy={true}
        smooth={true}
        duration={700}
        offset={-20}
        containerId="ingredients"
      >
        <Tab
          value={tab.title}
          active={currentTab === tab.type}
          onClick={() => dispatch(setCurrentTab(tab.type))}
        >
          {tab.title}
        </Tab>
      </Link>
    );
  });

  const IngredientsGroups = ingredientGroups.map((item, i) => (
    <BurgerIngredientsList
      key={i}
      id={++i}
      title={item.title}
      data={ingredients.filter((el) => el.type === item.type)}
    />
  ));

  return (
    <section className={s.wrapper}>
      <div className={s.tabs}>{tabList}</div>
      <div className={s.ingredients}>
        <ul id="ingredients" className={s.ingredients__list}>
          {IngredientsGroups}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
