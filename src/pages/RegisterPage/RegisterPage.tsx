import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useStore } from "../../hooks";
import { useNavHeader } from "../../hooks/useNavHeader";
import { postRegister } from "../../store/authSlice";
import { UserData } from "../../utils/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileForm } from "../../utils/constant";
import { ButtonWithChildren } from "../../components/ButtonWithChildren/ButtonWithChildren";
import { ProfileFormContainer } from "../../components/ProfileFormContainer/ProfileFormContainer";
import { InputText } from "../../components/ProfileFormContainer/InputText/InputText";
import { InputEmail } from "../../components/ProfileFormContainer/InputEmail/InputEmail";
import { InputPassword } from "../../components/ProfileFormContainer/InputPassword/InputPassword";
import s from "./RegisterPage.module.css";

const links = [
  {
    question: "Уже зарегистрированы?",
    link: "Войти",
    path: "/login",
  },
];

const RegisterPage = () => {
  const dispatch = useDispatch();

  const {
    auth: { loading },
  } = useStore();

  const { setActive } = useNavHeader();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileForm),
    mode: "all",
  });

  const onSubmit = async (data: FieldValues) => {
    dispatch(postRegister(data as UserData));
  };

  useEffect(() => {
    setActive("");
  }, [setActive]);

  return (
    <main className="center-container">
      <ProfileFormContainer title="Вход" links={links}>
        <form
          name="register"
          className={s["form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputText error={!!errors.name} control={control} />
          <InputEmail error={!!errors.email} control={control} />
          <InputPassword error={!!errors.password} control={control} />
          <ButtonWithChildren
            loading={loading === "pending"}
            type="primary"
            size="medium"
            htmlType="button"
            onClick={handleSubmit(onSubmit)}
          >
            <span>Зарегистрироваться</span>
          </ButtonWithChildren>
        </form>
      </ProfileFormContainer>
    </main>
  );
};

export default RegisterPage;
