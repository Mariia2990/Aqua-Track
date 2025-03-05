import css from './UserBarPopover.module.css';
import { GlobalModal } from '../GlobalModal/GlobalModal';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';
import { LogOutModal } from '../LogOutModal/LogOutModal';

export function UserBarPopover() {

  return (
    <>
    <div className={css.popover}>
        <button>
        Settings
        </button>
        <button>
        Log out
        </button>
      </div>

      <GlobalModal>
        <UserSettingsForm/>
      </GlobalModal>

      <GlobalModal>
        <LogOutModal />
      </GlobalModal>
    </>
  );
}
