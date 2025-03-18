import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations.js';
import toast from 'react-hot-toast';
import css from './LogOutModal.module.css';
import { Loader } from '../Loader/Loader'; 

export const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); 

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      await dispatch(logOut()).unwrap();
      toast.success('See you soon!');
      onClose();
    } catch (error) {
      toast.error('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.content}>
      <div className={css.textWrapper}>
        <h2 className={css.title}>Log Out</h2>
        <p className={css.text}>Do you really want to leave?</p>
      </div>
      <div className={css.btnContainer}>
        <button
          className={css.logOutBtn}
          onClick={handleLogOut}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader absolute={true} />
              <span>Logging out...</span>
            </>
          ) : (
            'Log Out'
          )}
        </button>
        <button
          className={css.cancelBtn}
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
