// import css from "./DeleteModal.module.css";
import { ModalButton } from "../ModalButton/ModalButton";

export const DeleteModal = () => {

  return (
    <>
      <ModalButton text={"Delete"}></ModalButton>
      <ModalButton text={"Cancel"}></ModalButton>
    </>
  );
};
