import css from "./AddWaterBtn.module.css";
import { BaseModal } from "../BaseModal/BaseModal";
import { WaterModal } from '../WaterModal/WaterModal';

export function AddWaterBtn({className, onAddWater }) {

  const handleClick = () => {
    const amount = parseFloat(prompt("Enter amount of water (liters):") || "0");
    if (!isNaN(amount) && amount > 0) {
      onAddWater(amount);
    }
  };

  return (
    <div className={`${css.wrapper} ${className}`}>
    <button className={css.addButton} onClick={handleClick}>
      Add water
    </button>
      {/* <BaseModal>
        <WaterModal />
      </BaseModal> */}
    </div>
  );
}
