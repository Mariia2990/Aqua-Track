import sprite from '/public/img/sprite.svg';
import css from './UserBarPopover.module.css';

export const UserBarPopover = ({ onOpenModal }) => {
  return (
    <div className={css.userBarPopover}>
      <ul className={css.userBarPopoverWrapper}>
        <li>
          <button
            type="button"
            className={css.userBarPopoverBtn}
            onClick={onOpenModal}
          >
            <svg className={css.popoverIcons} width="16" height="16">
              <use href={sprite + '#icon-settings'} />
            </svg>
            Settings
          </button>
        </li>
        <li>
          <button
            type="button"
            className={css.userBarPopoverBtn}
            onClick={onOpenModal}
          >
            <svg className={css.popoverIcons} width="16" height="16">
              <use href={sprite + '#icon-log-out'} />
            </svg>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};
