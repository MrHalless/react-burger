import React from "react";
import cn from "classnames";
import s from "./ModalOverlay.module.css";

type ModalOverlayProps = {
  onClick: () => void;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClick }) => {
  return <div className={cn(s["modal-overlay"])} onClick={onClick} />;
};

export default ModalOverlay;
