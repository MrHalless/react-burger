import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MenuProfile } from "../../components/MenuProfile/MenuProfile";
import { useDispatch, useStore } from "../../hooks";
import { useMenuProfile } from "../../hooks/useMenuProfile";
import { useNavHeader } from "../../hooks/useNavHeader";
import { wsClose, wsInit } from "../../store/ordersSlice";
import { SOCKET } from "../../utils/constant";
import { profileRegExp } from "../../utils/regexp";
import s from "./ProfilePage.module.css";

const ProfilePage: React.FC = () => {
  const { setActive } = useNavHeader();
  const { setActiveMenuProfile } = useMenuProfile();
  const dispatch = useDispatch();

  const {
    profile: { user },
  } = useStore();

  const location = useLocation();
  const [isOrderPage, setIsOrderPage] = useState(false);
  const isProfile = profileRegExp.test(location.pathname);

  const accessToken = localStorage.getItem("accessToken")?.split(" ")[1];

  useEffect(() => {
    setActive("profile");
  }, [setActive]);

  useEffect(() => {
    if (user) {
      dispatch(wsInit(`${SOCKET}?token=${accessToken}`));
      return () => {
        dispatch(wsClose());
      };
    }
  }, [dispatch, accessToken, user]);

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
      {isProfile && <MenuProfile />}
      <Outlet />
    </main>
  );
};

export default ProfilePage;
