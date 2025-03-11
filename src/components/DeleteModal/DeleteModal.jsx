import { GlobalModal } from '../GlobalModal/GlobalModal';

import css from './DeleteModal.module.css';

export const DeleteModal = ({ id, isOpen, onClose }) => {
  return (
    <GlobalModal isOpen={isOpen} onClose={onClose}>
      <div className={css.modal}>
        <h2 className={css.modal__title}>Delete entry</h2>
        <p className={css.modal__subtitle}>
          Are you sure you want to delete this entry?
        </p>
        <div className={css.modal__buttons}>
          <button className={`buttonGreen ${css.modal__button}`}>Delete</button>
          <button className={`cancelButton ${css.modal__button}`} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </GlobalModal>
  );
};
