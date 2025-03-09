import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations.js';
import toast from 'react-hot-toast';
import css from './LogOutModal.module.css';

export const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  return (
    <div className={css.content}>
      <div className={css.textWrapper}>
        <h2 className={css.title}>Log Out</h2>
        <p className={css.text}>Do you really want to leave?</p>
      </div>
      <div className={css.btnContainer}>
        <button
          className={css.logOutBtn}
          onClick={() => {
            dispatch(logOut());
            onClose();
            toast.success('See you soon!');
          }}
        >
          Log Out
        </button>
        <button className={css.cancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};
