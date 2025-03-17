import { useDispatch, useSelector } from 'react-redux';
import { selectDate } from '../../redux/water/selectors';

import { deleteWater, fetchWaterDataDaily } from '../../redux/water/operations';

import css from './DeleteModal.module.css';
import toast from 'react-hot-toast';

export const DeleteModal = ({ id, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);

const handleDelete = async () => {
  if (!id) {
    toast.error('Invalid entry ID.');
    return;
  }
  try {
    await dispatch(deleteWater(id)).unwrap();
    toast.success('Water entry deleted successfully!');
    if (selectedDate) {
      dispatch(fetchWaterDataDaily(selectedDate));
    }
    onClose();
  } catch (error) {
    toast.error(error.message || 'Failed to delete water entry.');
  }
};

  return (
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
  );
};
