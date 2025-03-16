// import css from './WaterItem.module.css';
// import { BaseModal } from '../BaseModal/BaseModal';
// import { WaterModal } from '../WaterModal/WaterModal';
// import { DeleteModal } from '../DeleteModal/DeleteModal';
// import { GlobalModal } from '../GlobalModal/GlobalModal';
import css from './WaterItem.module.css';

export function WaterItem({ volume, date }) {
  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    return `${day}::${month}`;
  }

  return (
    <li className={css.item}>
      <img className={css.favicon} src="/img/favicon.svg" alt="Favicon" />
      <div className={css.dataWrapper}>
        <p className={css.itemVolume}>{volume}L</p>
        <p className={css.itemDate}>{formatDate(date)} AM</p>
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
