import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import s from "./AppHeader.module.css";
import NavLink from "./NavLink/NavLink";

const AppHeader: React.FC = () => {
  return (
    <header className={s.header}>
      <nav className={s.header__nav}>
        <div className={s.headerButton__wrapper}>
          <NavLink
            icon={<BurgerIcon type="primary" />}
            type={"primary"}
            text={"Конструктор"}
          />
          <NavLink
            icon={<ListIcon type="secondary" />}
            type={"secondary"}
            text={"Лента заказов"}
          />
        </div>
        <div className={s.headerLogo}>
          <Logo />
        </div>
        <NavLink
          icon={<ProfileIcon type="secondary" />}
          type={"secondary"}
          text={"Личный кабинет"}
        />
      </nav>
    </header>
  );
};

export default AppHeader;
