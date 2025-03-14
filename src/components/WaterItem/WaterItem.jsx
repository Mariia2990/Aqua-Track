// import css from './WaterItem.module.css';
// import { BaseModal } from '../BaseModal/BaseModal';
// import { WaterModal } from '../WaterModal/WaterModal';
// import { DeleteModal } from '../DeleteModal/DeleteModal';
// import { GlobalModal } from '../GlobalModal/GlobalModal';
import css from './WaterItem.module.css';

export function WaterItem({ volume, date, id }) {
  return (
    <li className={css.item}>
      <img className={css.favicon} src="/img/favicon.svg" alt="Favicon" />
      <div className={css.dataWrapper}>
        <p className={css.itemVolume}>{volume}L</p>
        <p className={css.itemDate}>{date} AM</p>
      </div>
      <div className={css.iconWrapper}>
        <button className={css.editBtn}>
          <img src="/img/edit.svg" alt="trash-icon" />
        </button>
        <button className={css.trashBtn}>
          <img src="/img/trash.svg" alt="trash-icon" />
        </button>
      </div>
    </li>
  );
}

{
  /* <BaseModal >
    <WaterModal/>
</BaseModal>

<GlobalModal>
    <DeleteModal />
</GlobalModal> */
}
