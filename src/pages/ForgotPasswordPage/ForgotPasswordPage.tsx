import React, { useEffect } from "react";
import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { useDispatch, useStore } from "../../hooks";
import { useNavHeader } from "../../hooks/useNavHeader";
import { postForgotPassword } from "../../store/profileSlice";
import { ForgotPassword } from "../../utils/profileApi";
import { ProfileFormContainer } from "../../components/ProfileFormContainer/ProfileFormContainer";
import { InputEmail } from "../../components/ProfileFormContainer/InputEmail/InputEmail";
import { ButtonWithChildren } from "../../components/ButtonWithChildren/ButtonWithChildren";
import s from "./ForgotPasswordPage.module.css";

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const links = [
  {
    question: "Вспомнили пароль?",
    link: "Войти",
    path: "/login",
  },
];

const ForgotPasswordPage = () => {
  const {
    profile: { passwordIsSend, loading },
  } = useStore();

  const navigate = useNavigate();

  const dispatch = useDispatch();

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
    dispatch(postForgotPassword(data as ForgotPassword));
  };

  useEffect(() => {
    passwordIsSend && navigate("/reset-password", { replace: true });
  }, [passwordIsSend, navigate]);
  useEffect(() => {
    setActive("");
  }, [setActive]);

  return (
    <main className="center-container">
      <ProfileFormContainer title="Восстановление пароля" links={links}>
        <form
          name="forgotPassword"
          className={s["form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputEmail
            error={!!errors.email}
            control={control}
            placeholder="Укажите e-mail"
          />
          <ButtonWithChildren
            loading={loading === "pending"}
            type="primary"
            size="medium"
            htmlType="submit"
          >
            <span>Восстановить</span>
          </ButtonWithChildren>
        </form>
      </ProfileFormContainer>
    </main>
  );
};

export default ForgotPasswordPage;
