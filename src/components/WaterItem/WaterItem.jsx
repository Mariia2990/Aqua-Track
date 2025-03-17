import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteWater } from '../../redux/water/operations'; // Додаємо Redux action
import css from './WaterItem.module.css';
import sprite from '/img/sprite.svg';
import { BaseModal } from '../BaseModal/BaseModal';
import { WaterModal } from '../WaterModal/WaterModal';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { GlobalModal } from '../GlobalModal/GlobalModal';

export function WaterItem({ item, volume, date, _id, onDelete }) {
  const id = _id;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
    setIsOpenDelete(false);
  }, []);

  const openModalDelete = useCallback(() => {
    setIsOpenDelete(true);
    setIsOpen(false);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);
  const closeModalDelete = useCallback(() => setIsOpenDelete(false), []);

  const handleDelete = async () => {
    try {
      await dispatch(deleteWater(id)).unwrap();
      onDelete(id);
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  function formatTime(isoString) {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    <div className={css.card}>
      <svg className={css.bottleIcon}>
        <use href={`${sprite}#icon-water-glass`}></use>
      </svg>
      <div className={css.textBox}>
        <p className={css.ml}>{volume} ml</p>
        <p className={css.itemDate}>{date ? formatTime(date) : 'No Date'}</p>
      </div>
      <div className={css.btnBox}>
        <button className={css.button} type="button" onClick={openModal}>
          <svg className={css.btnIcon}>
            <use href={`${sprite}#icon-edit`}></use>
          </svg>
        </button>
        <button className={css.button} type="button" onClick={openModalDelete}>
          <svg className={css.btnIcon}>
            <use href={`${sprite}#icon-trash`}></use>
          </svg>
        </button>
      </div>

      <GlobalModal isOpen={isOpen} onClose={closeModal}>
        <WaterModal
          type="edit"
          isOpen={isOpen}
          onClose={closeModal}
          volume={volume}
          id={id}
        />
      </GlobalModal>

      <BaseModal isOpen={isOpenDelete} onRequestClose={closeModalDelete}>
        <DeleteModal id={id} isOpen={isOpenDelete} onClose={closeModalDelete} />
      </BaseModal>
    </div>
  );
}
