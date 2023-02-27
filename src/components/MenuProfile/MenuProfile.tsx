import cn from "classnames";
import { useNavigate } from "react-router";
import { useDispatch, useStore } from "../../hooks";
import { postLogout } from "../../store/authSlice";
import { setActiveMenuProfileItem } from "../../store/menuProfileSlice";

import s from "./MenuProfile.module.css";

const menuList = [
  {
    id: "profile",
    linkTo: "/profile",
    text: "Профиль",
    tip: "В этом разделе вы можете изменить свои персональные данные",
  },
  {
    id: "orders",
    linkTo: "/profile/orders",
    text: "История заказов",
    tip: "В этом разделе вы можете просмотреть свою историю заказов",
  },
  {
    id: "logout",
    linkTo: "/profile",
    text: "Выход",
    tip: "До новых встреч !!!",
  },
];

export const MenuProfile = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const {
    menuProfile: { activeItem },
  } = useStore();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <ul className={cn("text text_type_main-medium pl-5", s.list)}>
        {menuList.map((item) => (
          <li
            key={item.id}
            className={cn(
              s.item,
              "pt-4 pb-4",
              activeItem === item.id && s.item_active
            )}
            onClick={() => {
              activeItem !== item.id &&
                dispatch(setActiveMenuProfileItem(item.id)) &&
                navigate(item.linkTo, { replace: true });
              item.id === "logout" && dispatch(postLogout(refreshToken));
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>
      <div>
        {menuList.map(
          (item) =>
            activeItem === item.id && (
              <p
                key={item.id}
                className={cn(s.tip, "text text_type_main-default pl-5")}
              >
                {item.tip}
              </p>
            )
        )}
      </div>
    </div>
  );
};
