import React from "react";
import cn from "classnames";
import s from "./IngredientDetails.module.css";
import { DataApi } from "../../models";

type IngredientDetailsProps = {
  data: DataApi;
};

const IngredientDetails: React.FC<IngredientDetailsProps> = ({ data }) => {
  return (
    <>
      <div className={cn(s["ingredient-details"])}>
        <img
          src={data.image_large}
          alt={data.name}
          className={cn(s["ingredient-details_img"], "mb-4")}
        />
        <h3
          className={cn(
            s["ingredient-details_name"],
            "text text_type_main-medium mb-8"
          )}
        >
          {data.name}
        </h3>
        <ul className={cn(s["ingredient-details_list"])}>
          <li className={cn(s["ingredient-details_item"])}>
            <span
              className={"text text_type_main-default text_color_inactive pb-2"}
            >
              Калории,ккал
            </span>
            <span
              className={"text text_type_digits-default text_color_inactive"}
            >
              {data.calories}
            </span>
          </li>
          <li className={cn(s["ingredient-details_item"])}>
            <span
              className={"text text_type_main-default text_color_inactive pb-2"}
            >
              Белки, г
            </span>
            <span
              className={"text text_type_digits-default text_color_inactive"}
            >
              {data.proteins}
            </span>
          </li>
          <li className={cn(s["ingredient-details_item"])}>
            <span
              className={"text text_type_main-default text_color_inactive pb-2"}
            >
              Жиры, г
            </span>
            <span
              className={"text text_type_digits-default text_color_inactive"}
            >
              {data.fat}
            </span>
          </li>
          <li className={cn(s["ingredient-details_item"])}>
            <span
              className={"text text_type_main-default text_color_inactive pb-2"}
            >
              Углеводы, г
            </span>
            <span
              className={"text text_type_digits-default text_color_inactive"}
            >
              {data.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default IngredientDetails;
