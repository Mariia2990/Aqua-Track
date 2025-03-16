// import css from './WaterItem.module.css';
import { BaseModal } from '../BaseModal/BaseModal';
import { WaterModal } from '../WaterModal/WaterModal';
// import { DeleteModal } from '../DeleteModal/DeleteModal';
// import { GlobalModal } from '../GlobalModal/GlobalModal';
import { useState } from 'react';
import css from './WaterItem.module.css';
import { useDispatch } from 'react-redux';
import { deleteWater } from '../../redux/water/operations';

export function WaterItem({ _id, volume, date }) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}:${month}`;
  }

  return (
    <>
      <li className={css.item}>
        <img className={css.favicon} src="/img/favicon.svg" alt="Favicon" />
        <div className={css.dataWrapper}>
          <p className={css.itemVolume}>{volume}L</p>
          <p className={css.itemDate}>{formatDate(date)} AM</p>
        </div>
        <div className={css.iconWrapper}>
          <button className={css.editBtn} onClick={handleOpenModal}>
            <img src="/img/edit.svg" alt="edit-icon" />
          </button>
          <button
            className={css.trashBtn}
            onClick={() => dispatch(deleteWater({ _id }))}
          >
            <img src="/img/trash.svg" alt="trash-icon" />
          </button>
        </div>
      </li>
      {<WaterModal isOpen={isOpen} onclose={handleCloseModal} />}
    </>
  );
}
