import { forwardRef } from 'react';
// import { GlobalModal } from '../GlobalModal/GlobalModal';
// import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
// import { LogOutModal } from '../LogOutModal/LogOutModal';
import sprite from '../../img/sprite.svg';
import css from './UserBarPopover.module.css';

export const UserBarPopover = forwardRef(function UserBarPopover(props, ref) {
  return (
    <div className={css.userBarPopover} ref={ref}>
      <ul className={css.userBarPopoverWrapper}>
        <li>
          <button type="button" className={css.userBarPopoverBtn}>
            <svg className={css.popoverIcons} width="16" height="16">
              <use href={sprite + '#icon-settings'} />
            </svg>
            Settings
          </button>
        </li>
        <li>
          <button type="button" className={css.userBarPopoverBtn}>
            <svg className={css.popoverIcons} width="16" height="16">
              <use href={sprite + '#icon-log-out'} />
            </svg>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
});
{
  /* <GlobalModal>
        <UserSettingsForm />
      </GlobalModal>

      <GlobalModal>
        <LogOutModal />
      </GlobalModal> */
}
