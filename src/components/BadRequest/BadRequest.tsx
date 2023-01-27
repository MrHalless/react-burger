import React from "react";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface BadRequestProps {
  error?: string;
}

const BadRequest: React.FC<BadRequestProps> = ({ error }) => {
  return (
    <div>
      <p className="text text_type_main-medium mb-5 mt-10">
        Что-то пошло не так...
      </p>
      <p className="text text_type_main-medium">
        <InfoIcon type="error" /> {error}
      </p>
    </div>
  );
};

export default BadRequest;
