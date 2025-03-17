import { GlobalModal } from '../GlobalModal/GlobalModal';
import { WaterForm } from '../WaterForm/WaterForm';

import css from './WaterModal.module.css';

export const WaterModal = ({
  type = 'add',
  id,
  volume,
  date,
  isOpen,
  onClose,
  onEdit,
}) => {
  return (
    <GlobalModal isOpen={isOpen} onClose={onClose}>
      <div className={css.modal}>
        {type === 'add' && <h2 className={css.modal_title}>Add water</h2>}
        {type === 'edit' && (
          <h2 className={css.modal_title}>Edit the entered amount of water</h2>
        )}
        <WaterForm
          type={type}
          id={id}
          volume={volume}
          date={date}
          onClose={onClose}
        />
      </div>
    </GlobalModal>
  );
};
