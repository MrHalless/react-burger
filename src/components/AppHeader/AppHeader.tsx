import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../hooks";
import s from "./AppHeader.module.css";
import NavLink from "./NavLink/NavLink";

const AppHeader: React.FC = () => {
  const {
    profile: { user },
    headerNav: { activeLink },
  } = useStore();

  const main = useMemo(
    () => (activeLink === "/" ? "primary" : "secondary"),
    [activeLink]
  );
  const feed = useMemo(
    () => (activeLink === "feed" ? "primary" : "secondary"),
    [activeLink]
  );
  const profile = useMemo(
    () => (activeLink === "profile" ? "primary" : "secondary"),
    [activeLink]
  );

  return (
    <header className={s.header}>
      <nav className={s.header__nav}>
        <div className={s.header__wrap}>
          <Link to="/" className={s.header__link}>
            <NavLink
              icon={<BurgerIcon type={main} />}
              type={main}
              text={"Конструктор"}
            />
          </Link>
          <Link to="/feed" className={s.header__link}>
            <NavLink
              icon={<ListIcon type={feed} />}
              type={feed}
              text={"Лента заказов"}
            />
          </Link>
        </div>
        <div className={s.header__logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <Link to={user ? "/profile" : "/login"} className={s.header__link}>
          <NavLink
            icon={<ProfileIcon type={profile} />}
            type={profile}
            text={user ? "Личный кабинет" : "Войти"}
          />
        </Link>
      </nav>
    </header>
  );
};

export default AppHeader;
