import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MenuProfile } from "../../components/MenuProfile/MenuProfile";
import { useMenuProfile } from "../../hooks/useMenuProfile";
import { useNavHeader } from "../../hooks/useNavHeader";
import s from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const { setActive } = useNavHeader();
  const { setActiveMenuProfile } = useMenuProfile();

  const location = useLocation();
  const [isOrderPage, setIsOrderPage] = useState(false);

  useEffect(() => {
    setActive("profile");
  }, [setActive]);

  useEffect(() => {
    switch (location.pathname) {
      case "/profile":
        isOrderPage && setIsOrderPage(false);
        setActiveMenuProfile("profile");
        break;
      case "/profile/orders":
        isOrderPage && setIsOrderPage(false);
        setActiveMenuProfile("orders");
        break;
      default:
        setActiveMenuProfile("orders");
        setIsOrderPage(true);
    }
  }, [location, isOrderPage, setIsOrderPage, setActiveMenuProfile]);

  return (
    <main className={isOrderPage ? "center-container" : s["container"]}>
      {!isOrderPage && <MenuProfile />}
      <Outlet />
    </main>
  );
};
