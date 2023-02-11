import React from "react";
import { Oval, ThreeDots } from "react-loader-spinner";
import s from "./Loader.module.css";

interface LoaderPropsType {
  type?: "small" | "medium" | "large";
  height?: number;
  width?: number;
  color?: string;
}

const Loader = ({
  type = "large",
  height = 100,
  width = 100,
  color = "var(--colors-interface-success)",
}: LoaderPropsType) => (
  <div className={s["container"]}>
    <div className={s["wrapper"]}>
      {type === "large" ? (
        <ThreeDots height={height} width={width} color={color} />
      ) : (
        <Oval
          ariaLabel="loading-indicator"
          height={40}
          width={40}
          strokeWidth={5}
          color={color}
          secondaryColor="#fff"
        />
      )}
    </div>
  </div>
);

export default Loader;
