import { FieldValues, useForm } from "react-hook-form";
import cn from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import profileEdit from "./profile-edit.module.css";
import { useDispatch, useStore } from "../../hooks";
import { profileForm } from "../../utils/constant";
import { UserData } from "../../utils/authApi";
import { patchUser } from "../../store/profileSlice";
import { ProfileFormContainer } from "../../components/ProfileFormContainer/ProfileFormContainer";
import { InputText } from "../../components/ProfileFormContainer/InputText/InputText";
import { ButtonWithChildren } from "../../components/ButtonWithChildren/ButtonWithChildren";
import s from "./ProfileEdit.module.css";

const ProfileEdit = () => {
  const dispatch = useDispatch();

  const {
    profile: { user, loading },
  } = useStore();

  const accessToken = localStorage.getItem("accessToken");

  const [isDisabledName, setIsDisabledName] = useState(true);
  const [isDisabledEmail, setIsDisabledEmail] = useState(true);
  const [isDisabledPassword, setIsDisabledPassword] = useState(true);

  const {
    handleSubmit,
    control,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileForm),
    reValidateMode: "onChange",
  });

  const onSubmit = (data: FieldValues) => {
    if (data) {
      dispatch(
        patchUser({
          userData: data as UserData,
          token: accessToken as string,
        })
      );
    }
  };

  const handlerSetIsDisabledName = useCallback(() => {
    setIsDisabledName(!isDisabledName);
  }, [isDisabledName]);

  const handlerSetIsDisabledEmail = useCallback(() => {
    setIsDisabledEmail(!isDisabledEmail);
  }, [isDisabledEmail]);

  const handlerSetIsDisabledPassword = useCallback(() => {
    setIsDisabledPassword(!isDisabledPassword);
  }, [isDisabledPassword]);

  const handlerClickChanel = useCallback(() => {
    setValue("name", user?.name, { shouldDirty: true });
    setValue("email", user?.email, { shouldDirty: true });
    setValue("password", "", { shouldDirty: true });
    setIsDisabledName(true);
    setIsDisabledEmail(true);
    setIsDisabledPassword(true);
    clearErrors();
  }, [setValue, user, clearErrors]);

  useEffect(() => {
    handlerClickChanel();
  }, [user, setValue, handlerClickChanel]);

  return (
    <ProfileFormContainer>
      <form
        name="edit"
        className="form form_end mt-30"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputText
          error={!!errors.name}
          control={control}
          disabled={isDisabledName}
          icon={isDisabledName ? "EditIcon" : "CloseIcon"}
          onIconClick={handlerSetIsDisabledName}
        />
        <InputText
          placeholder="Логин"
          name="email"
          type="email"
          error={!!errors.email}
          control={control}
          disabled={isDisabledEmail}
          icon={isDisabledEmail ? "EditIcon" : "CloseIcon"}
          onIconClick={handlerSetIsDisabledEmail}
        />
        <InputText
          placeholder="Пароль"
          name="password"
          type="password"
          error={!!errors.password}
          control={control}
          disabled={isDisabledPassword}
          icon={isDisabledPassword ? "EditIcon" : "CloseIcon"}
          onIconClick={handlerSetIsDisabledPassword}
        />
        <div className={s["wrapper"]}>
          <button
            type="button"
            onClick={handlerClickChanel}
            className={cn("text text_type_main-default", s["button"])}
          >
            Отмена
          </button>
          <ButtonWithChildren
            type="primary"
            size="medium"
            onClick={handleSubmit(onSubmit)}
            loading={loading === "pending"}
            htmlType={"button"}
          >
            <span>Сохранить</span>
          </ButtonWithChildren>
        </div>
      </form>
    </ProfileFormContainer>
  );
};

export default ProfileEdit;
