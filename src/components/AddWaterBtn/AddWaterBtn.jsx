import css from "./AddWaterBtn.module.css";
import { BaseModal } from "../BaseModal/BaseModal";
import { WaterModal } from '../WaterModal/WaterModal';
import { useState } from "react";

export function AddWaterBtn({className, onAddWater }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    const amount = parseFloat(prompt("Enter amount of water (liters):") || "0");
    if (!isNaN(amount) && amount > 0) {
      onAddWater(amount);
    }
  };

  return (
    <div className={`${css.wrapper} ${className}`}>
      <button className={css.addButton} onClick={handleClick}>
        <svg width="16px" height="16px" fill="#fff">
          <use href="/public/img/sprite.svg#icon-plus-stroke"/>
        </svg>
        Add water
      </button>

      {isOpen && (
        <BaseModal>
          <WaterModal onAddWater={onAddWater} />
        </BaseModal>
      )}
    </div>
  );
}
