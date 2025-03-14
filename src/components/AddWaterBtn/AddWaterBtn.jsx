import css from "./AddWaterBtn.module.css";
import { WaterModal } from '../WaterModal/WaterModal';
import { useState } from "react";
import clsx from 'clsx';
import { FaPlus } from 'react-icons/fa6';
import { GlobalModal } from "../GlobalModal/GlobalModal";

export function AddWaterBtn({ className, onAddWater, section }) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = (mainClass) =>
    clsx(mainClass, {
      [css.waterMain]: section === 'waterMain',
      [css.daily]: section === 'daily',
    });

  const handleClick = () => {
    const amount = parseFloat(prompt('Enter amount of water (liters):') || '0');
    if (!isNaN(amount) && amount > 0) {
      onAddWater(amount);
    }
  };

  return (
    <div className={`${css.wrapper} ${className}`}>
      <button className={classes(css.wrapperBtn)} onClick={handleClick}>
        <FaPlus className={classes(css.plusIcon)} />
        <p className={classes(css.text)}>Add water</p>
      </button>

      {isOpen && (
        <GlobalModal>
          <WaterModal onAddWater={onAddWater} />
        </GlobalModal>
      )}
    </div>
  );
}
