import React, { ReactNode } from "react";
import s from "./NavLink.module.css";
import cn from "classnames";

type NavLinkProps = React.PropsWithChildren<{
  icon: ReactNode;
  text: string;
  type: string;
}>;

const NavLink: React.FC<NavLinkProps> = ({ icon, text, type }) => {
  return (
    <div className={s.link}>
      <div className={"mr-2"} children={icon} />
      {type === "primary" ? (
        <p className={cn("text text_type_main-default", s.link__text)}>
          {text}
        </p>
      ) : (
        <p
          className={cn(
            "text text_type_main-default text_color_inactive",
            s.link__text
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default NavLink;
