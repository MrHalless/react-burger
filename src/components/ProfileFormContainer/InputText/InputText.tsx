import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Controller } from "react-hook-form";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Control, FieldValues } from "react-hook-form";
import { ERRORS } from "../../../utils/constant";

export interface InputPropsType {
  error: boolean;
  control: Control<FieldValues, any> | undefined;
  placeholder?: string;
  icon?: keyof TICons;
}

export interface InputTextPropsType extends InputPropsType {
  name?: "name" | "token" | "password" | "email";
  disabled?: boolean;
  defaultValue?: string;
  onIconClick?: () => void;
  type?: "text" | "password" | "email";
}

export const InputText = ({
  error,
  control,
  placeholder = "Имя",
  name = "name",
  icon,
  disabled,
  onIconClick,
  type = "text",
}: InputTextPropsType) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, onBlur, value, ref } }) => (
      <Input
        placeholder={placeholder}
        type={type}
        value={value || ""}
        ref={ref}
        disabled={disabled}
        onBlur={onBlur}
        onChange={onChange}
        error={error}
        icon={icon}
        style={{ marginBottom: "10px" }}
        onIconClick={onIconClick}
        errorText={
          value
            ? name === "name"
              ? ERRORS.ERROR_NAME
              : name === "token"
              ? ERRORS.ERROR_CODE
              : name === "email"
              ? ERRORS.ERROR_EMAIL
              : name === "password"
              ? ERRORS.ERROR_PASSWORD
              : ""
            : ERRORS.ERROR_REQUIRED_FIELD
        }
      />
    )}
  />
);
