import css from './AddWaterBtn.module.css';
import { WaterModal } from '../WaterModal/WaterModal';
import { useState } from 'react';
import clsx from 'clsx';
import { FaPlus } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/water/selectors';

export function AddWaterBtn({ className, section }) {
  const selectedDate = useSelector(selectDate);
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const selectedDateFormatted = selectedDate
    ? selectedDate.split('T')[0]
    : null;

  const classes = (mainClass) =>
    clsx(mainClass, {
      [css.waterMain]: section === 'waterMain',
      [css.daily]: section === 'daily',
      [css.disabled]: selectedDateFormatted !== today,
    });

  const isDisabled = selectedDateFormatted !== today;

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={`${css.wrapper} ${className}`}>
      <button
        className={classes(css.wrapperBtn)}
        onClick={handleOpenModal}
        disabled={isDisabled}
      >
        <FaPlus className={classes(css.plusIcon)} />
        <p className={classes(css.text)}>Add water</p>
      </button>

      <WaterModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
}
