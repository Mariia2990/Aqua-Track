import ReactModal from 'react-modal';

import css from './GlobalModal.module.css';

import sprite from '/public/img/sprite.svg';

export const GlobalModal = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal_content}
      overlayClassName={css.modal_overlay}
      ariaHideApp={false}
    >
      <button className={css.modal_closeButton} onClick={onClose}>
        <svg className={css.modal_closeIcon}>
          <use href={`${sprite}#icon-exit`} />
        </svg>
      </button>
      <div className={css.modal_body}>{children}</div>
    </ReactModal>
  );
};
