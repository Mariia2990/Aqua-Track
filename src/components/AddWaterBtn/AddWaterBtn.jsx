// import css from "./AddWaterBtn.module.css";
import { BaseModal } from "../BaseModal/BaseModal";
import { WaterModal } from '../WaterModal';

export function AddWaterBtn() {

  return (
    <>
      <BaseModal>
        <WaterModal />
      </BaseModal>
    </>
  );
}
