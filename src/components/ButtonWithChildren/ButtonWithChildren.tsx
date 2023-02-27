import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ReactElement, SyntheticEvent } from "react";
import Loader from "../Loader/Loader";

import s from "./ButtonWithChildren.module.css";

export interface ButtonType {
  type?: "secondary" | "primary";
  size?: "small" | "medium" | "large";
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
  name?: string;
  htmlType: "button" | "submit" | "reset";
  children: ReactElement;
  loading?: boolean;
}

export const withButton = (Element: typeof Button) => (props: ButtonType) => {
  const { loading, ...rest } = props;
  return (
    <div className={s["container"]}>
      {loading ? (
        <>
          <div className={s["loader"]}>
            <Loader type="small" />
          </div>
          <Element {...rest} disabled={true} />
        </>
      ) : (
        <Element {...rest} />
      )}
    </div>
  );
};

export const ButtonWithChildren = withButton(Button);
