import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Controller } from "react-hook-form";
import { ERRORS } from "../../../utils/constant";
import { InputPropsType } from "../InputText/InputText";

export const InputEmail = ({
  error,
  control,
  placeholder = "E-mail",
}: InputPropsType) => (
  <Controller
    name="email"
    control={control}
    render={({ field: { onChange, onBlur, value, ref } }) => (
      <Input
        placeholder={placeholder}
        type="email"
        value={value || ""}
        ref={ref}
        onBlur={onBlur}
        onChange={onChange}
        style={{ marginBottom: "10px" }}
        error={error}
        errorText={value ? ERRORS.ERROR_EMAIL : ERRORS.ERROR_REQUIRED_FIELD}
      />
    )}
  />
);
