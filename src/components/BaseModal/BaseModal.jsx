import { useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import css from './BaseModal.module.css';
import { MdClose } from 'react-icons/md';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(47, 47, 47, 0.6)',
  },
}; 

Modal.setAppElement('#root');

export const BaseModal = ({ isOpen, onRequestClose, children, title }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    },
    [onRequestClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      className={title === 'Setting' ? css.content : css.logoutContent}
      style={customStyles}
    >
      <div className={css.modalHeader}>
        {title === 'Setting' && (
          <div className={css.textBox}>
            <p className={css.titleHeader}>{title}</p>
          </div>
        )}

        <div className={css.closeBtn}>
          <MdClose onClick={onRequestClose} size={'24px'} />
        </div>
      </div>
      {(title === 'Log out' || title === 'Delete') && (
        <div className={css.textBox}>
          <p className={css.titleHeader}>{title}</p>
        </div>
      )}
      <div className={css.modalContent}>{children}</div>
    </Modal>
  );
};
