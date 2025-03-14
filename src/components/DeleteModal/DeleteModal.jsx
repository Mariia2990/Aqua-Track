import { useDispatch } from 'react-redux';

import { GlobalModal } from '../GlobalModal/GlobalModal';
import { deleteWater } from '../../redux/water/operations';

import css from './DeleteModal.module.css';

export const DeleteModal = ({ id, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteWater({ id }));
      toast.success('Water entry deleted successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to delete water entry.');
    }
  };

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose}>
      <div className={css.modal}>
        <h2 className={css.modal__title}>Delete entry</h2>
        <p className={css.modal__subtitle}>
          Are you sure you want to delete this entry?
        </p>
        <div className={css.modal__buttons}>
          <button
            className={`buttonGreen ${css.modal__button}`}
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className={`cancelButton ${css.modal__button}`}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </GlobalModal>
  );
};
