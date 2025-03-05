// import css from "./DeleteModal.module.css";
import { ModalButton } from "../BaseModal/BaseModal";

export const DeleteModal = () => {

  return (
    <>
      <ModalButton text={"Delete"}></ModalButton>
      <ModalButton text={"Cancel"}></ModalButton>
    </>
  );
};
