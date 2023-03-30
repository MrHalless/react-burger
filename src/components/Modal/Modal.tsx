import React, { useEffect } from "react";
import cn from "classnames";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import s from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

type ModalProps = {
  title?: string | JSX.Element;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, title, onClose }) => {
  const modalRoot = document.getElementById("modals") as HTMLElement;
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={cn(s["modal"], "p-10", "pb-15")}>
        <div className={cn(s["modal_header"])}>
          {title && (
            <h2 className={cn(s["modal_title"], "text text_type_main-large")}>
              {title}
            </h2>
          )}
          <button className={s.buttonClose}>
            <CloseIcon type="primary" onClick={onClose} />
          </button>
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
