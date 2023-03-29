import React, { useEffect } from "react";
import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useStore } from "../../hooks";
import { Navigate, useLocation } from "react-router-dom";
import { useNavHeader } from "../../hooks/useNavHeader";
import { postLogin } from "../../store/authSlice";
import { UserData } from "../../utils/authApi";
import { ProfileFormContainer } from "../../components/ProfileFormContainer/ProfileFormContainer";
import { InputEmail } from "../../components/ProfileFormContainer/InputEmail/InputEmail";
import { InputPassword } from "../../components/ProfileFormContainer/InputPassword/InputPassword";
import { ButtonWithChildren } from "../../components/ButtonWithChildren/ButtonWithChildren";
import s from "./LoginPage.module.css";
import { wsClose } from "../../store/ordersSlice";

export interface LocationStateType {
  pathname: string;
  state: {
    from: Location;
  };
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

const links = [
  {
    question: "Вы — новый пользователь?",
    link: "Зарегистрироваться",
    path: "/register",
  },
  {
    question: "Забыли пароль?",
    link: "Восстановить пароль",
    path: "/forgot-password",
  },
];

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const { setActive } = useNavHeader();

  const {
    auth: { loading },
  } = useStore();

  const location = useLocation() as LocationStateType;
  const from = location?.state?.from || "/";

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: FieldValues) => {
    dispatch(postLogin(data as Omit<UserData, "name">));
    dispatch(wsClose());
  };

  useEffect(() => {
    setActive("profile");
  }, [setActive]);

  return (
    <main className="center-container">
      <ProfileFormContainer title="Вход" links={links}>
        <form name="login" className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <InputEmail error={!!errors.email} control={control} />
          <InputPassword error={!!errors.password} control={control} />
          <ButtonWithChildren
            loading={loading === "pending"}
            type="primary"
            size="medium"
            htmlType="submit"
          >
            <span>Войти</span>
          </ButtonWithChildren>
        </form>
      </ProfileFormContainer>
    </main>
  );
};

export default LoginPage;
