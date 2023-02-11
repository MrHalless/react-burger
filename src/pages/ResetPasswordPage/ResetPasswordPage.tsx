import React, { useEffect } from "react";
import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { useDispatch, useStore } from "../../hooks";
import { useNavHeader } from "../../hooks/useNavHeader";
import { postResetPassword } from "../../store/profileSlice";
import { ResetPassword } from "../../utils/profileApi";
import { ProfileFormContainer } from "../../components/ProfileFormContainer/ProfileFormContainer";
import { InputPassword } from "../../components/ProfileFormContainer/InputPassword/InputPassword";
import { InputText } from "../../components/ProfileFormContainer/InputText/InputText";
import { ButtonWithChildren } from "../../components/ButtonWithChildren/ButtonWithChildren";

const schema = yup
  .object({
    password: yup.string().min(6).required(),
    token: yup.string().min(2).required(),
  })
  .required();

const links = [
  {
    question: "Вспомнили пароль?",
    link: "Войти",
    path: "/login",
  },
];

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();

  const {
    profile: { passwordIsSend, loading },
  } = useStore();

  const navigate = useNavigate();

  const { setActive } = useNavHeader();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: FieldValues) => {
    dispatch(postResetPassword(data as ResetPassword));
  };

  useEffect(() => {
    !passwordIsSend && navigate("/login", { replace: true });
  }, [passwordIsSend, navigate]);

  useEffect(() => {
    setActive("");
  }, [setActive]);

  return (
    <main className="center-container">
      <ProfileFormContainer title="Восстановление пароля" links={links}>
        <form
          name="forgotPassword"
          className="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputPassword
            error={!!errors.password}
            control={control}
            placeholder="Введите новый пароль"
          />
          <InputText
            error={!!errors.token}
            control={control}
            placeholder="Введите код из письма"
            name="token"
          />
          <ButtonWithChildren
            loading={loading === "pending"}
            type="primary"
            size="medium"
            htmlType={"button"}
            onClick={handleSubmit(onSubmit)}
          >
            <span>Сохранить</span>
          </ButtonWithChildren>
        </form>
      </ProfileFormContainer>
    </main>
  );
};
