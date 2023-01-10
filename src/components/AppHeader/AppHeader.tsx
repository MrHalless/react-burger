import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import s from "./AppHeader.module.css";
import ButtonHeader from "./ButtonHeader/ButtonHeader";

const AppHeader: React.FC = () => {
  return (
    <header className={s.header}>
      <nav className={s.header__nav}>
        <div className={s.headerButton__wrapper}>
          <ButtonHeader icon={<BurgerIcon type="primary" />}>
            Конструктор
          </ButtonHeader>
          <ButtonHeader icon={<ListIcon type="secondary" />}>
            Лента заказов
          </ButtonHeader>
        </div>
        <div className={s.headerLogo}>
          <Logo />
        </div>
        <ButtonHeader icon={<ProfileIcon type="primary" />}>
          Личный кабинет
        </ButtonHeader>
      </nav>
    </header>
  );
};

export default AppHeader;
