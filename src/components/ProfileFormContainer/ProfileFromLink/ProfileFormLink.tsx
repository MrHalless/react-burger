import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import s from "./ProfileFormLink.module.css";

export interface ProfileFormLinkPropsType {
  question: string;
  link: string;
  path: string;
}

export const ProfileFormLink = ({
  question,
  link,
  path,
}: ProfileFormLinkPropsType) => (
  <div className={s["wrapper"]}>
    <p className={cn("text text_type_main-default mr-2", s["question"])}>
      {question}
    </p>
    <Link to={path} className={cn("text text_type_main-default", s["link"])}>
      {link}
    </Link>
  </div>
);
