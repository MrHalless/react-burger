import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { ERRORS } from "../../../utils/constant";
import { InputPropsType } from "../InputText/InputText";

export const InputPassword = ({
  error,
  control,
  placeholder = "Пароль",
}: InputPropsType) => {
  const [isViewPassword, setIsViewPassword] = useState<
    "password" | "text" | "email" | undefined
  >("password");

  return (
    <Controller
      name="password"
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Input
          placeholder={placeholder}
          value={value || ""}
          ref={ref}
          onBlur={onBlur}
          onChange={onChange}
          type={isViewPassword}
          style={{ marginBottom: "10px" }}
          onIconClick={() => {
            isViewPassword === "password"
              ? setIsViewPassword("text")
              : setIsViewPassword("password");
          }}
          icon={isViewPassword === "password" ? "HideIcon" : "ShowIcon"}
          error={error}
          errorText={
            value ? ERRORS.ERROR_PASSWORD : ERRORS.ERROR_REQUIRED_FIELD
          }
        />
      )}
    />
  );
};
