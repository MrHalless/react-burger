import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { DataApi } from "../../models";
import { ingredientGroups } from "../../utils/ingredientGroups";
import s from "./BurgerIngredients.module.css";
import BurgerIngredientsList from "./BurgerIngredientsList/BurgerIngredientsList";
import { Link } from "react-scroll";

type BurgerIngredientsProps = {
  data: DataApi[];
};

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ data }) => {
  const [currentTab, setCurrentTab] = useState("");
  const tabList = ingredientGroups.map((tab, i) => {
    return (
      <Link
        key={i}
        to={`ingredients-block-${i}`}
        spy={true}
        smooth={true}
        duration={700}
        offset={-20}
        containerId="ingredients"
        onSetActive={() => setCurrentTab(tab.title)}
      >
        <Tab
          value={tab.title}
          active={currentTab === tab.title}
          onClick={setCurrentTab}
        >
          {tab.title}
        </Tab>
      </Link>
    );
  });

  const IngredientsGroups = ingredientGroups.map((item, i) => (
    <BurgerIngredientsList
      key={i}
      id={i}
      title={item.title}
      data={data.filter((el) => el.type === item.type)}
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
