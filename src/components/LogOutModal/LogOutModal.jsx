// import css from "./LogOutModal.module.css";
import { ModalButton } from "../ModalButton/ModalButton";


export const LogOutModal = () => {
  return (
    <>
      <ModalButton text={"Log out"}></ModalButton>
      <ModalButton text={"Cancel"}></ModalButton>
    </>
  );
};
