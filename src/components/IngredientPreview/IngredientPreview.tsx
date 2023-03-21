import cn from "classnames";
import { BurgerIngredientType } from "../../models";

import s from "./IngredientPreview.module.css";

export interface IngredientPreviewPropsType {
  ingredient?: BurgerIngredientType;
  lastCount?: number;
  isRotate?: boolean;
}

export const IngredientPreview = ({
  isRotate = false,
  ingredient,
  lastCount,
}: IngredientPreviewPropsType) => {
  return (
    <li className={cn(s.container, isRotate && s.container_rotate)}>
      <div className={s.background} />
      <img
        className={cn(s.image, lastCount && s.image_overlay)}
        src={ingredient?.image}
        alt={ingredient?.name}
      />
      {lastCount && (
        <span className={cn(s.countNext, "text text_type_main-default")}>
          +{lastCount}
        </span>
      )}
    </li>
  );
};
