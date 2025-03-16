import css from './AddWaterBtn.module.css';
import { WaterModal } from '../WaterModal/WaterModal';
import { useState } from 'react';
import clsx from 'clsx';
import { FaPlus } from 'react-icons/fa6';

export function AddWaterBtn({ className, section }) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = (mainClass) =>
    clsx(mainClass, {
      [css.waterMain]: section === 'waterMain',
      [css.daily]: section === 'daily',
    });

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={`${css.wrapper} ${className}`}>
      <button className={classes(css.wrapperBtn)} onClick={handleOpenModal}>
        <FaPlus className={classes(css.plusIcon)} />
        <p className={classes(css.text)}>Add water</p>
      </button>

      <WaterModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
}
