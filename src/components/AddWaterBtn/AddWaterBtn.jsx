// import css from "./AddWaterBtn.module.css";
import { DisplayCloseModal } from "../DisplayCloseModal/DisplayCloseModal";
import { ModalWater } from "../ModalWater/ModalWater";

export function AddWaterBtn() {

  return (
    <>
      <DisplayCloseModal>
        <ModalWater/>
      </DisplayCloseModal>
    </>
  );
}
