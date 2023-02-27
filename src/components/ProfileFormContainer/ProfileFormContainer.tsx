import React from "react";
import s from "./ProfileFormContainer.module.css";
import {
  ProfileFormLink,
  ProfileFormLinkPropsType,
} from "./ProfileFromLink/ProfileFormLink";

export interface RedirectLinkType {
  question?: string;
  linkText: string;
  linkTo: string;
}

export interface ProfileFormContainerPropsType {
  title?: string;
  children?: JSX.Element;
  links?: ProfileFormLinkPropsType[];
}

export const ProfileFormContainer = ({
  title,
  children,
  links,
}: ProfileFormContainerPropsType) => {
  return (
    <div className={s["container"]}>
      <>
        {title && <span className={s.title}>{title}</span>}
        {children && children}
        {links && (
          <div className={s["links"]}>
            {links.map((item) => (
              <ProfileFormLink key={item.link + item.path} {...item} />
            ))}
          </div>
        )}
      </>
    </div>
  );
};
