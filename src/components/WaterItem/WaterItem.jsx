// import css from './WaterItem.module.css';
import { BaseModal } from '../BaseModal/BaseModal';
import { WaterModal } from '../WaterModal/WaterModal';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { GlobalModal } from '../GlobalModal/GlobalModal';

export function WaterItem() {
  
    return (
      <>
    <BaseModal >
        <WaterModal/>
    </BaseModal>

    <GlobalModal>
        <DeleteModal />
    </GlobalModal>
    </>
  );
}
