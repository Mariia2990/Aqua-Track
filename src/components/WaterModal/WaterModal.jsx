import { GlobalModal } from '../GlobalModal/GlobalModal';
import { WaterForm } from '../WaterForm/WaterForm';

import css from './WaterModal.module.css';

export const WaterModal = ({ type = 'add', waterInfo, isOpen, onClose }) => {
  return (
    <GlobalModal isOpen={isOpen} onClose={onClose}>
      <div className={css.modal}>
        {type === 'add' ? <h2 className={css.modal_title}>Add water</h2> : null}
        {type === 'edit' ? (
          <h2 className={css.modal_title}>Edit the entered amount of water</h2>
        ) : null}
        <WaterForm waterInfo={waterInfo} onClose={onClose} />
      </div>
    </GlobalModal>
  );
};
