import React, { ReactNode } from "react";
import s from "./ButtonHeader.module.css";
import cn from "classnames";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

type ButtonHeaderProps = React.PropsWithChildren<{
  icon: ReactNode;
}>;

const ButtonHeader: React.FC<ButtonHeaderProps> = ({ icon, children }) => {
  const buttonHeaderClasses = cn(
    s.buttonHeader__text,
    "text text_type_main-default"
  );
  return (
    <Button
      htmlType="button"
      type="secondary"
      size="medium"
      className={s.buttonHeader}
    >
      {icon}
      <span className={buttonHeaderClasses}>{children}</span>
    </Button>
  );
};

export default ButtonHeader;
